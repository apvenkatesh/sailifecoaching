import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, type Appointment } from "@shared/schema";
import nodemailer from "nodemailer";
import { addMonths, isBefore, isAfter, startOfDay, parse as dateParse } from "date-fns";

const COACH_EMAIL = "meetcoachsp@gmail.com";
const GMAIL_USER = "meetcoachsp@gmail.com";

function getTransporter() {
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) { console.log("[Email] No GMAIL_APP_PASSWORD — skipping"); return null; }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass },
  });
}

function formatType(type: string) {
  return type === "discovery" ? "Discovery Call (Free Intro Session)" : "Coaching Session";
}

/* ─── ICS generation ─────────────────────────────────────────────── */
function parseTimeStr(str: string): { hour: number; min: number } {
  const [time, ampm] = str.trim().split(" ");
  let [hour, min] = time.split(":").map(Number);
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return { hour, min };
}

function icsDateTime(dateStr: string, timeStr: string) {
  // dateStr: "March 20, 2026"  timeStr: "10:00 AM"
  const d = dateParse(dateStr, "MMMM d, yyyy", new Date());
  const { hour, min } = parseTimeStr(timeStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(hour).padStart(2, "0");
  const mn = String(min).padStart(2, "0");
  return `${y}${m}${day}T${h}${mn}00`;
}

function icsNow() {
  return new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
}

function generateICS(appt: Appointment, method: "REQUEST" | "CANCEL"): string {
  const [startStr, endStr] = appt.timeSlot.split(" – ");
  const dtStart = icsDateTime(appt.date, startStr);
  const dtEnd = icsDateTime(appt.date, endStr);
  const summary = `${formatType(appt.appointmentType)} - Sai Life Coaching`;
  const uid = `${appt.id}@sailifecooaching.com`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sai Life Coaching//EN",
    "CALSCALE:GREGORIAN",
    `METHOD:${method}`,
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${icsNow()}`,
    `DTSTART;TZID=America/Los_Angeles:${dtStart}`,
    `DTEND;TZID=America/Los_Angeles:${dtEnd}`,
    `SUMMARY:${summary}`,
    "DESCRIPTION:This is a virtual appointment. Coach SP will share the video conference link via email before your session.",
    "LOCATION:Virtual (Video Conference)",
    `ORGANIZER;CN=Coach SP:mailto:${COACH_EMAIL}`,
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${appt.firstName} ${appt.lastName}:mailto:${appt.email}`,
    `STATUS:${method === "CANCEL" ? "CANCELLED" : "CONFIRMED"}`,
    method === "CANCEL" ? "SEQUENCE:1" : "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function icsAttachment(appt: Appointment, method: "REQUEST" | "CANCEL") {
  const content = generateICS(appt, method);
  return {
    filename: "appointment.ics",
    content: Buffer.from(content).toString("base64"),
  };
}

/* ─── Email helpers ──────────────────────────────────────────────── */
function detailsTable(appt: Appointment) {
  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-family:Arial,sans-serif;">
      <tr><td style="padding:8px;font-weight:bold;color:#555;width:130px;">Type</td><td style="padding:8px;">${formatType(appt.appointmentType)}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555;">Date</td><td style="padding:8px;">${appt.date}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;color:#555;">Time</td><td style="padding:8px;">${appt.timeSlot}</td></tr>
      <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555;">Duration</td><td style="padding:8px;">60 minutes</td></tr>
    </table>`;
}

async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  icsMethod: "REQUEST" | "CANCEL";
  appt: Appointment;
}) {
  const transporter = getTransporter();
  if (!transporter) return;
  const ics = icsAttachment(opts.appt, opts.icsMethod);
  try {
    await transporter.sendMail({
      from: `"Sai Life Coaching" <${GMAIL_USER}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      attachments: [{
        filename: ics.filename,
        content: Buffer.from(ics.content as string, "base64"),
        contentType: "text/calendar; method=" + opts.icsMethod,
      }],
    });
    console.log(`[Email] Sent to ${opts.to}: ${opts.subject}`);
  } catch (err) {
    console.error("[Email] send failed:", err);
  }
}

async function sendBookingEmails(appt: Appointment) {
  const details = detailsTable(appt);
  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1b2a3b;">Your Appointment is Confirmed!</h2>
      <p>Hi ${appt.firstName},</p>
      <p>Thank you for booking with Coach SP. Here are your details:</p>
      ${details}
      <p style="background:#f5f4f0;padding:16px;border-left:4px solid #c8953d;">
        <strong>Virtual Appointment:</strong> Coach SP will share the video conference link via email before your session.
      </p>
      <p style="color:#888;font-size:12px;">Sai Life Coaching · Coach Shanmuga Priya</p>
    </div>`;
  const coachHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1b2a3b;">New Appointment Booked</h2>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr><td style="padding:8px;font-weight:bold;color:#555;">Client</td><td style="padding:8px;">${appt.firstName} ${appt.lastName}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555;">Phone</td><td style="padding:8px;">${appt.phone}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;color:#555;">Email</td><td style="padding:8px;">${appt.email}</td></tr>
        ${detailsTable(appt).replace(/<\/?table[^>]*>/g, "").replace(/<\/?tr>/g, "").replace(/<td/g, "<td")}
        ${appt.hearAboutUs ? `<tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#555;">Referral</td><td style="padding:8px;">${appt.hearAboutUs}</td></tr>` : ""}
      </table>
    </div>`;
  await Promise.allSettled([
    sendEmail({ to: appt.email, subject: `Appointment Confirmed — ${formatType(appt.appointmentType)} on ${appt.date}`, html: customerHtml, icsMethod: "REQUEST", appt }),
    sendEmail({ to: COACH_EMAIL, subject: `New Booking: ${appt.firstName} ${appt.lastName} — ${appt.date} ${appt.timeSlot}`, html: coachHtml, icsMethod: "REQUEST", appt }),
  ]);
}

async function sendUpdateEmails(appt: Appointment, oldDate: string, oldSlot: string) {
  const details = detailsTable(appt);
  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1b2a3b;">Your Appointment Has Been Updated</h2>
      <p>Hi ${appt.firstName},</p>
      <p>Your appointment has been rescheduled. Previous slot: <strong>${oldDate} · ${oldSlot}</strong></p>
      <p>New appointment details:</p>
      ${details}
      <p style="background:#f5f4f0;padding:16px;border-left:4px solid #c8953d;">
        <strong>Virtual Appointment:</strong> Coach SP will share the updated video conference link via email.
      </p>
      <p style="color:#888;font-size:12px;">Sai Life Coaching · Coach Shanmuga Priya</p>
    </div>`;
  const coachHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1b2a3b;">Appointment Rescheduled</h2>
      <p>Client: <strong>${appt.firstName} ${appt.lastName}</strong> (${appt.email})</p>
      <p>Old slot: ${oldDate} · ${oldSlot}</p>
      <p>New slot:</p>
      ${details}
    </div>`;
  await Promise.allSettled([
    sendEmail({ to: appt.email, subject: `Appointment Updated — Now ${appt.date} · ${appt.timeSlot}`, html: customerHtml, icsMethod: "REQUEST", appt }),
    sendEmail({ to: COACH_EMAIL, subject: `Rescheduled: ${appt.firstName} ${appt.lastName} → ${appt.date} ${appt.timeSlot}`, html: coachHtml, icsMethod: "REQUEST", appt }),
  ]);
}

async function sendCancelEmails(appt: Appointment) {
  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1b2a3b;">Appointment Cancelled</h2>
      <p>Hi ${appt.firstName},</p>
      <p>Your appointment has been cancelled:</p>
      ${detailsTable(appt)}
      <p>We hope to see you again soon. You can book a new appointment anytime at our website.</p>
      <p style="color:#888;font-size:12px;">Sai Life Coaching · Coach Shanmuga Priya</p>
    </div>`;
  const coachHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1b2a3b;">Appointment Cancelled</h2>
      <p>Client: <strong>${appt.firstName} ${appt.lastName}</strong> (${appt.email})</p>
      ${detailsTable(appt)}
    </div>`;
  await Promise.allSettled([
    sendEmail({ to: appt.email, subject: `Appointment Cancelled — ${appt.date} · ${appt.timeSlot}`, html: customerHtml, icsMethod: "CANCEL", appt }),
    sendEmail({ to: COACH_EMAIL, subject: `Cancelled: ${appt.firstName} ${appt.lastName} — ${appt.date} ${appt.timeSlot}`, html: coachHtml, icsMethod: "CANCEL", appt }),
  ]);
}

/* ─── Date validation ────────────────────────────────────────────── */
function validateAppointmentDate(dateStr: string): string | null {
  try {
    const apptDate = dateParse(dateStr, "MMMM d, yyyy", new Date());
    const today = startOfDay(new Date());
    const maxDate = addMonths(today, 2);
    if (isBefore(apptDate, today)) return "Cannot book an appointment in the past.";
    if (isAfter(apptDate, maxDate)) return "Cannot book more than 2 months in advance.";
    return null;
  } catch {
    return "Invalid date format.";
  }
}

/* ─── Routes ─────────────────────────────────────────────────────── */
export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {

  // Book appointment
  app.post("/api/book-appointment", async (req, res) => {
    try {
      const parsed = insertAppointmentSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: "Invalid data", details: parsed.error.flatten() });

      const dateError = validateAppointmentDate(parsed.data.date);
      if (dateError) return res.status(400).json({ error: dateError });

      const conflict = await storage.getActiveAppointmentBySlot(parsed.data.date, parsed.data.timeSlot);
      if (conflict) return res.status(409).json({ error: "This time slot is already booked. Please choose another." });

      const normalised = { ...parsed.data, email: parsed.data.email.toLowerCase() };
      const appt = await storage.createAppointment(normalised);
      sendBookingEmails(appt).catch(console.error);
      return res.json({ success: true, appointment: appt });
    } catch (err) {
      console.error("/api/book-appointment:", err);
      return res.status(500).json({ error: "Failed to book appointment" });
    }
  });

  // Lookup by email
  app.get("/api/appointments/lookup", async (req, res) => {
    try {
      const email = String(req.query.email || "").toLowerCase();
      if (!email) return res.status(400).json({ error: "Email required" });
      const appts = await storage.getAppointmentsByEmail(email);
      return res.json({ appointments: appts });
    } catch (err) {
      console.error("/api/appointments/lookup:", err);
      return res.status(500).json({ error: "Lookup failed" });
    }
  });

  // Update appointment slot
  app.patch("/api/appointments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { date, timeSlot, email } = req.body;
      if (!date || !timeSlot || !email) return res.status(400).json({ error: "date, timeSlot and email required" });

      const existing = await storage.getAppointmentById(id);
      if (!existing) return res.status(404).json({ error: "Appointment not found" });
      if (existing.email.toLowerCase() !== email.toLowerCase()) return res.status(403).json({ error: "Not authorised" });
      if (existing.status !== "active") return res.status(400).json({ error: "Appointment is not active" });

      const dateError = validateAppointmentDate(date);
      if (dateError) return res.status(400).json({ error: dateError });

      // Only conflict-check if slot actually changed
      if (date !== existing.date || timeSlot !== existing.timeSlot) {
        const conflict = await storage.getActiveAppointmentBySlot(date, timeSlot);
        if (conflict && conflict.id !== id) return res.status(409).json({ error: "That time slot is already booked. Please choose another." });
      }

      const oldDate = existing.date;
      const oldSlot = existing.timeSlot;
      const updated = await storage.updateAppointmentSlot(id, date, timeSlot);
      if (!updated) return res.status(500).json({ error: "Update failed" });
      sendUpdateEmails(updated, oldDate, oldSlot).catch(console.error);
      return res.json({ success: true, appointment: updated });
    } catch (err) {
      console.error("/api/appointments/:id PATCH:", err);
      return res.status(500).json({ error: "Update failed" });
    }
  });

  // Cancel appointment
  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: "Email required" });

      const existing = await storage.getAppointmentById(id);
      if (!existing) return res.status(404).json({ error: "Appointment not found" });
      if (existing.email.toLowerCase() !== email.toLowerCase()) return res.status(403).json({ error: "Not authorised" });
      if (existing.status !== "active") return res.status(400).json({ error: "Already cancelled" });

      const cancelled = await storage.cancelAppointment(id);
      if (!cancelled) return res.status(500).json({ error: "Cancel failed" });
      sendCancelEmails(cancelled).catch(console.error);
      return res.json({ success: true });
    } catch (err) {
      console.error("/api/appointments/:id DELETE:", err);
      return res.status(500).json({ error: "Cancel failed" });
    }
  });

  return httpServer;
}
