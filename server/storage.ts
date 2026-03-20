import { eq, and } from "drizzle-orm";
import { db } from "./db";
import {
  appointments,
  type Appointment,
  type InsertAppointment,
  type User,
  type InsertUser,
  workshopSignups,
  type WorkshopSignup,
  type InsertWorkshopSignup,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAppointment(data: InsertAppointment): Promise<Appointment>;
  getAppointmentsByEmail(email: string): Promise<Appointment[]>;
  getAppointmentById(id: string): Promise<Appointment | undefined>;
  getActiveAppointmentBySlot(date: string, timeSlot: string): Promise<Appointment | undefined>;
  getBookedSlotsForDate(date: string): Promise<string[]>;
  updateAppointmentSlot(id: string, date: string, timeSlot: string): Promise<Appointment | undefined>;
  cancelAppointment(id: string): Promise<Appointment | undefined>;
  // Workshop signups
  createWorkshopSignup(data: InsertWorkshopSignup): Promise<WorkshopSignup>;
  getWorkshopSignupsByEmail(email: string): Promise<WorkshopSignup[]>;
  getActiveSignupCountByWorkshop(workshopId: string): Promise<number>;
  cancelWorkshopSignup(id: string): Promise<WorkshopSignup | undefined>;
  getWorkshopSignupById(id: string): Promise<WorkshopSignup | undefined>;
  getActiveSignupByWorkshopAndEmail(workshopId: string, email: string): Promise<WorkshopSignup | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private appts: Map<string, Appointment> = new Map();
  private wsSignups: Map<string, WorkshopSignup> = new Map();

  async getUser(id: string) { return this.users.get(id); }
  async getUserByUsername(username: string) {
    return Array.from(this.users.values()).find(u => u.username === username);
  }
  async createUser(data: InsertUser): Promise<User> {
    const user: User = { id: randomUUID(), ...data };
    this.users.set(user.id, user);
    return user;
  }
  async createAppointment(data: InsertAppointment): Promise<Appointment> {
    const a: Appointment = { id: randomUUID(), status: "active", createdAt: new Date().toISOString(), hearAboutUs: null, ...data };
    this.appts.set(a.id, a);
    return a;
  }
  async getAppointmentsByEmail(email: string) {
    return Array.from(this.appts.values()).filter(a => a.email.toLowerCase() === email.toLowerCase() && a.status === "active");
  }
  async getAppointmentById(id: string) { return this.appts.get(id); }
  async getActiveAppointmentBySlot(date: string, timeSlot: string) {
    return Array.from(this.appts.values()).find(a => a.date === date && a.timeSlot === timeSlot && a.status === "active");
  }
  async getBookedSlotsForDate(date: string): Promise<string[]> {
    return Array.from(this.appts.values())
      .filter(a => a.date === date && a.status === "active")
      .map(a => a.timeSlot);
  }
  async updateAppointmentSlot(id: string, date: string, timeSlot: string) {
    const a = this.appts.get(id);
    if (!a) return undefined;
    const updated = { ...a, date, timeSlot };
    this.appts.set(id, updated);
    return updated;
  }
  async cancelAppointment(id: string) {
    const a = this.appts.get(id);
    if (!a) return undefined;
    const updated = { ...a, status: "cancelled" };
    this.appts.set(id, updated);
    return updated;
  }
  async createWorkshopSignup(data: InsertWorkshopSignup): Promise<WorkshopSignup> {
    const s: WorkshopSignup = { id: randomUUID(), status: "active", createdAt: new Date().toISOString(), ...data };
    this.wsSignups.set(s.id, s);
    return s;
  }
  async getWorkshopSignupsByEmail(email: string) {
    return Array.from(this.wsSignups.values()).filter(s => s.email.toLowerCase() === email.toLowerCase() && s.status === "active");
  }
  async getActiveSignupCountByWorkshop(workshopId: string) {
    return Array.from(this.wsSignups.values()).filter(s => s.workshopId === workshopId && s.status === "active").length;
  }
  async cancelWorkshopSignup(id: string) {
    const s = this.wsSignups.get(id);
    if (!s) return undefined;
    const updated = { ...s, status: "cancelled" };
    this.wsSignups.set(id, updated);
    return updated;
  }
  async getWorkshopSignupById(id: string) { return this.wsSignups.get(id); }
  async getActiveSignupByWorkshopAndEmail(workshopId: string, email: string) {
    return Array.from(this.wsSignups.values()).find(s => s.workshopId === workshopId && s.email.toLowerCase() === email.toLowerCase() && s.status === "active");
  }
}

export class DbStorage implements IStorage {
  async getUser(id: string) {
    const [u] = await db.select().from(appointments).where(eq(appointments.id, id));
    return u as any;
  }
  async getUserByUsername(_: string) { return undefined; }
  async createUser(data: InsertUser): Promise<User> {
    throw new Error("Not implemented");
  }

  async createAppointment(data: InsertAppointment): Promise<Appointment> {
    const [a] = await db.insert(appointments).values(data).returning();
    return a;
  }

  async getAppointmentsByEmail(email: string): Promise<Appointment[]> {
    return db
      .select()
      .from(appointments)
      .where(and(eq(appointments.email, email.toLowerCase()), eq(appointments.status, "active")));
  }

  async getAppointmentById(id: string): Promise<Appointment | undefined> {
    const [a] = await db.select().from(appointments).where(eq(appointments.id, id));
    return a;
  }

  async getActiveAppointmentBySlot(date: string, timeSlot: string): Promise<Appointment | undefined> {
    const [a] = await db
      .select()
      .from(appointments)
      .where(and(eq(appointments.date, date), eq(appointments.timeSlot, timeSlot), eq(appointments.status, "active")));
    return a;
  }

  async getBookedSlotsForDate(date: string): Promise<string[]> {
    const rows = await db
      .select({ timeSlot: appointments.timeSlot })
      .from(appointments)
      .where(and(eq(appointments.date, date), eq(appointments.status, "active")));
    return rows.map(r => r.timeSlot);
  }

  async updateAppointmentSlot(id: string, date: string, timeSlot: string): Promise<Appointment | undefined> {
    const [a] = await db
      .update(appointments)
      .set({ date, timeSlot })
      .where(eq(appointments.id, id))
      .returning();
    return a;
  }

  async cancelAppointment(id: string): Promise<Appointment | undefined> {
    const [a] = await db
      .update(appointments)
      .set({ status: "cancelled" })
      .where(eq(appointments.id, id))
      .returning();
    return a;
  }

  async createWorkshopSignup(data: InsertWorkshopSignup): Promise<WorkshopSignup> {
    const [s] = await db.insert(workshopSignups).values(data).returning();
    return s;
  }

  async getWorkshopSignupsByEmail(email: string): Promise<WorkshopSignup[]> {
    return db.select().from(workshopSignups)
      .where(and(eq(workshopSignups.email, email.toLowerCase()), eq(workshopSignups.status, "active")));
  }

  async getActiveSignupCountByWorkshop(workshopId: string): Promise<number> {
    const rows = await db.select().from(workshopSignups)
      .where(and(eq(workshopSignups.workshopId, workshopId), eq(workshopSignups.status, "active")));
    return rows.length;
  }

  async cancelWorkshopSignup(id: string): Promise<WorkshopSignup | undefined> {
    const [s] = await db.update(workshopSignups).set({ status: "cancelled" })
      .where(eq(workshopSignups.id, id)).returning();
    return s;
  }

  async getWorkshopSignupById(id: string): Promise<WorkshopSignup | undefined> {
    const [s] = await db.select().from(workshopSignups).where(eq(workshopSignups.id, id));
    return s;
  }

  async getActiveSignupByWorkshopAndEmail(workshopId: string, email: string): Promise<WorkshopSignup | undefined> {
    const [s] = await db.select().from(workshopSignups)
      .where(and(eq(workshopSignups.workshopId, workshopId), eq(workshopSignups.email, email.toLowerCase()), eq(workshopSignups.status, "active")));
    return s;
  }
}

export const storage: IStorage = new DbStorage();
