import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema } from "@shared/schema";
import { Resend } from "resend";

const COACH_EMAIL = "meetcoachsp@gmail.com";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function formatAppointmentType(type: string) {
  return type === "discovery" ? "Discovery Call (Free Intro Session)" : "Coaching Session";
}

async function sendConfirmationEmails(appointment: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  appointmentType: string;
  date: string;
  timeSlot: string;
  hearAboutUs?: string | null;
}) {
  const resend = getResend();
  if (!resend) {
    console.log("[Email] RESEND_API_KEY not set — skipping email send");
    return;
  }

  const fullName = `${appointment.firstName} ${appointment.lastName}`;
  const apptType = formatAppointmentType(appointment.appointmentType);

  const customerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1b2a3b;">Your Appointment is Confirmed!</h2>
      <p>Hi ${appointment.firstName},</p>
      <p>Thank you for booking a session with Coach SP. Here are your appointment details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 8px; font-weight: bold; color: #555;">Type</td><td style="padding: 8px;">${apptType}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold; color: #555;">Date</td><td style="padding: 8px;">${appointment.date}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #555;">Time</td><td style="padding: 8px;">${appointment.timeSlot}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold; color: #555;">Duration</td><td style="padding: 8px;">60 minutes</td></tr>
      </table>
      <p style="background: #f5f4f0; padding: 16px; border-left: 4px solid #c8953d;">
        <strong>This is a virtual appointment.</strong> Coach SP will share the video conference details via email prior to your session.
      </p>
      <p>If you have any questions, please reach out at <a href="mailto:${COACH_EMAIL}">${COACH_EMAIL}</a>.</p>
      <p style="color: #888; font-size: 12px;">Sai Life Coaching · Coach Shanmuga Priya</p>
    </div>
  `;

  const coachHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1b2a3b;">New Appointment Booked</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 8px; font-weight: bold; color: #555;">Client</td><td style="padding: 8px;">${fullName}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold; color: #555;">Phone</td><td style="padding: 8px;">${appointment.phone}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #555;">Email</td><td style="padding: 8px;">${appointment.email}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold; color: #555;">Type</td><td style="padding: 8px;">${apptType}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #555;">Date</td><td style="padding: 8px;">${appointment.date}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold; color: #555;">Time</td><td style="padding: 8px;">${appointment.timeSlot}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; color: #555;">Duration</td><td style="padding: 8px;">60 minutes</td></tr>
        ${appointment.hearAboutUs ? `<tr style="background:#f9f9f9"><td style="padding: 8px; font-weight: bold; color: #555;">How did they hear</td><td style="padding: 8px;">${appointment.hearAboutUs}</td></tr>` : ""}
      </table>
    </div>
  `;

  await Promise.allSettled([
    resend.emails.send({
      from: "Sai Life Coaching <onboarding@resend.dev>",
      to: appointment.email,
      subject: `Appointment Confirmed — ${apptType} on ${appointment.date}`,
      html: customerHtml,
    }),
    resend.emails.send({
      from: "Sai Life Coaching Bookings <onboarding@resend.dev>",
      to: COACH_EMAIL,
      subject: `New Booking: ${fullName} — ${apptType} on ${appointment.date}`,
      html: coachHtml,
    }),
  ]);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/book-appointment", async (req, res) => {
    try {
      const parsed = insertAppointmentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid appointment data", details: parsed.error.flatten() });
      }

      const appointment = await storage.createAppointment(parsed.data);

      sendConfirmationEmails(parsed.data).catch((err) => {
        console.error("[Email] Failed to send confirmation emails:", err);
      });

      return res.json({ success: true, appointment });
    } catch (err) {
      console.error("/api/book-appointment error:", err);
      return res.status(500).json({ error: "Failed to book appointment" });
    }
  });

  return httpServer;
}
