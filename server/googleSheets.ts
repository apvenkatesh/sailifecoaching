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
  detailsUrl: string;
  sessions: string[];
  totalSlots: number;
}

export async function fetchWorkshopsFromSheet(): Promise<WorkshopRow[]> {
  const sheets = await getGoogleSheetsClient();
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: WORKSHOP_SHEET_ID,
    includeGridData: true,
  });

  const firstSheet = meta.data.sheets?.[0];
  const gridData = firstSheet?.data?.[0];
  if (!gridData?.rowData || gridData.rowData.length < 2) return [];

  const headerRow = gridData.rowData[0]?.values || [];
  const headers = headerRow.map((cell: any) =>
    (cell.formattedValue || "").trim().toLowerCase()
  );
  const col = (name: string) => headers.indexOf(name);

  return gridData.rowData.slice(1).map((row: any, i: number) => {
    const cells = row.values || [];
    const getVal = (idx: number): string =>
      idx >= 0 ? cells[idx]?.formattedValue || "" : "";
    const getLink = (idx: number): string => {
      if (idx < 0) return "";
      const cell = cells[idx];
      return cell?.hyperlink || cell?.textFormatRuns?.[0]?.format?.link?.uri || "";
    };

    const sessions: string[] = [];
    for (let s = 1; s <= 6; s++) {
      const si = col(`session ${s}`);
      const sv = getVal(si);
      if (sv) sessions.push(sv);
    }

    const descIdx = col("description");
    const detailsUrl = getLink(descIdx);

    return {
      id: String(i + 1),
      title: getVal(col("name")) || getVal(0) || "",
      detailsUrl,
      sessions,
      totalSlots: parseInt(getVal(col("slots")) || "0", 10),
    };
  });
}
