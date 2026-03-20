import { google } from "googleapis";

// Google Sheets integration via Replit connector
async function getAccessToken(): Promise<string> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;
  if (!xReplitToken) throw new Error("X-Replit-Token not found");
  const data = await fetch(
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=google-sheet",
    { headers: { Accept: "application/json", "X-Replit-Token": xReplitToken } }
  ).then((r) => r.json());
  const conn = data.items?.[0];
  const accessToken =
    conn?.settings?.access_token ||
    conn?.settings?.oauth?.credentials?.access_token;
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
  date: string;
  time: string;
  totalSlots: number;
}

export async function fetchWorkshopsFromSheet(): Promise<WorkshopRow[]> {
  const sheets = await getGoogleSheetsClient();
  const meta = await sheets.spreadsheets.get({ spreadsheetId: WORKSHOP_SHEET_ID });
  const firstSheetTitle = meta.data.sheets?.[0]?.properties?.title || "Sheet1";
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: WORKSHOP_SHEET_ID,
    range: firstSheetTitle,
  });
  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0].map((h: string) => h.trim().toLowerCase());
  const col = (name: string) => headers.indexOf(name);

  return rows.slice(1).map((row: string[], i: number) => ({
    id: row[col("id")] || String(i + 1),
    title: row[col("title")] || row[0] || "",
    description: row[col("description")] || "",
    date: row[col("date")] || "",
    time: row[col("time")] || "",
    totalSlots: parseInt(row[col("total slots")] || row[col("totalslots")] || row[col("slots")] || "0", 10),
  }));
}
