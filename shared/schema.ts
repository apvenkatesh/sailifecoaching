import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  appointmentType: text("appointment_type").notNull(),
  date: text("date").notNull(),
  timeSlot: text("time_slot").notNull(),
  hearAboutUs: text("hear_about_us"),
  status: text("status").notNull().default("active"),
  createdAt: text("created_at").default(sql`now()`),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

export const workshopSignups = pgTable("workshop_signups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workshopId: text("workshop_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull().default("active"),
  createdAt: text("created_at").default(sql`now()`),
});

export const insertWorkshopSignupSchema = createInsertSchema(workshopSignups).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertWorkshopSignup = z.infer<typeof insertWorkshopSignupSchema>;
export type WorkshopSignup = typeof workshopSignups.$inferSelect;
