import { google } from "googleapis";

// Google Sheets integration via Replit connector
let connectionSettings: any;

export async function getAccessToken(): Promise<string> {
  if (
    connectionSettings?.settings?.expires_at &&
    new Date(connectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return connectionSettings.settings.access_token;
  }
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;
  if (!xReplitToken) throw new Error("X-Replit-Token not found");
  connectionSettings = await fetch(
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=google-sheet",
    { headers: { Accept: "application/json", "X-Replit-Token": xReplitToken } }
  )
    .then((r) => r.json())
    .then((d) => d.items?.[0]);
  const accessToken =
    connectionSettings?.settings?.access_token ||
    connectionSettings?.settings?.oauth?.credentials?.access_token;
  if (!accessToken) throw new Error("Google Sheet not connected");
  return accessToken;
}

export async function getGoogleSheetsClient() {
  const accessToken = await getAccessToken();
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.sheets({ version: "v4", auth: oauth2Client });
}

export const WORKSHOP_SHEET_ID = "1ORwSswA1d0e9KitnLzfcLIT3IOayvhfXeIDAHl5wM5A";

export interface WorkshopRow {
  id: string;
  title: string;
  description: string;
  sessions: string[];
  totalSlots: number;
}

export async function fetchWorkshopsFromSheet(): Promise<WorkshopRow[]> {
  const sheets = await getGoogleSheetsClient();

  // Read both tabs in parallel
  const [workshopsRes, descRes] = await Promise.all([
    sheets.spreadsheets.values.get({
      spreadsheetId: WORKSHOP_SHEET_ID,
      range: "Workshops",
    }),
    sheets.spreadsheets.values.get({
      spreadsheetId: WORKSHOP_SHEET_ID,
      range: "Description",
    }),
  ]);

  const rows = workshopsRes.data.values;
  if (!rows || rows.length < 2) return [];

  // Parse description tab — each row corresponds to the workshop at that index;
  // if only one row exists it is shared across all workshops
  const descRows = descRes.data.values || [];
  const getDesc = (i: number): string => {
    const row = descRows[i] ?? descRows[0];
    return row?.[0]?.trim() || "";
  };

  const headers = rows[0].map((h: string) => h.trim().toLowerCase());
  const col = (name: string) => headers.indexOf(name);

  return rows.slice(1).map((row: string[], i: number) => {
    const getVal = (idx: number): string => (idx >= 0 ? row[idx] || "" : "");

    const sessions: string[] = [];
    for (let s = 1; s <= 6; s++) {
      const si = col(`session ${s}`);
      const sv = getVal(si);
      if (sv) sessions.push(sv);
    }

    return {
      id: String(i + 1),
      title: getVal(col("name")) || getVal(0) || "",
      description: getDesc(i),
      sessions,
      totalSlots: parseInt(getVal(col("slots")) || "0", 10),
    };
  });
}
