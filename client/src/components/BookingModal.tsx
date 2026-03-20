import { useState } from "react";
import {
  X, ChevronLeft, ChevronRight, CheckCircle, Loader2, CalendarDays, Search, AlertTriangle,
} from "lucide-react";
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval, getDay,
  isBefore, startOfDay, addMonths, isSameDay, isAfter, parse as dateParse,
} from "date-fns";

const TIME_SLOTS = [
  "10:00 AM – 11:00 AM",
  "11:30 AM – 12:30 PM",
  "01:30 PM – 02:30 PM",
];

const APPOINTMENT_TYPES = [
  { value: "discovery", label: "Discovery Call (Free Intro Session)" },
  { value: "coaching", label: "Coaching Session" },
];

const HEAR_ABOUT_OPTIONS = [
  "Instagram", "Facebook", "Google Search", "Friend / Family Referral", "MindValley", "Other",
];

interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  appointmentType: string;
  date: string;
  timeSlot: string;
  hearAboutUs?: string | null;
  status: string;
}

interface BookFormState {
  firstName: string; lastName: string; phone: string; email: string;
  appointmentType: string; timeSlot: string; hearAboutUs: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Shared calendar component ─────────────────────────────────── */
function Calendar({
  selected, onSelect, calendarMonth, setCalendarMonth,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
  calendarMonth: Date;
  setCalendarMonth: (d: Date) => void;
}) {
  const today = startOfDay(new Date());
  const maxDate = addMonths(today, 2);
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = getDay(monthStart);
  const isDisabled = (d: Date) =>
    isBefore(d, today) || isAfter(d, maxDate) || getDay(d) === 0 || getDay(d) === 6;

  return (
    <div className="border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCalendarMonth(addMonths(calendarMonth, -1))}
          className="p-1 hover:text-[#c8953d] transition-colors text-[#1b2a3b]">
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-bold text-[#1b2a3b]" style={{ fontFamily: "'Raleway',sans-serif" }}>
          {format(calendarMonth, "MMMM yyyy")}
        </span>
        <button onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
          className="p-1 hover:text-[#c8953d] transition-colors text-[#1b2a3b]">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-[#999] uppercase py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: startPad }).map((_, i) => <div key={`pad-${i}`} />)}
        {days.map(day => {
          const disabled = isDisabled(day);
          const sel = selected && isSameDay(day, selected);
          return (
            <button key={day.toISOString()} disabled={disabled}
              onClick={() => onSelect(day)}
              className={`aspect-square flex items-center justify-center text-sm rounded-full m-0.5 transition-all ${
                sel ? "bg-[#c8953d] text-white font-bold"
                  : disabled ? "text-gray-300 cursor-not-allowed"
                  : "text-[#1b2a3b] hover:bg-[#c8953d]/15"
              }`}>
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimeSlotPicker({ selected, onSelect, error, bookedSlots = [] }: {
  selected: string; onSelect: (s: string) => void; error?: string; bookedSlots?: string[];
}) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TIME_SLOTS.map(slot => {
          const booked = bookedSlots.includes(slot);
          return (
            <button key={slot} onClick={() => !booked && onSelect(slot)} disabled={booked}
              className={`border px-3 py-4 text-sm font-medium text-center transition-all ${
                booked
                  ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                  : selected === slot
                    ? "border-[#c8953d] bg-[#c8953d]/10 text-[#1b2a3b] font-bold"
                    : "border-gray-200 text-[#555] hover:border-[#c8953d]/50"
              }`}>
              {slot}
              {booked && <span className="block text-[10px] mt-0.5 no-underline" style={{ textDecoration: "none" }}>Unavailable</span>}
            </button>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#1b2a3b] text-sm font-bold tracking-wider uppercase mb-4 pb-2 border-b border-gray-100"
      style={{ fontFamily: "'Raleway',sans-serif" }}>
      {children}
    </h3>
  );
}

function ApptCard({ appt, onReschedule, onCancel }: {
  appt: Appointment; onReschedule: () => void; onCancel: () => void;
}) {
  const typeLabel = appt.appointmentType === "discovery"
    ? "Discovery Call (Free Intro Session)" : "Coaching Session";
  return (
    <div className="border border-gray-200 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[#1b2a3b] font-bold text-base" style={{ fontFamily: "'Raleway',sans-serif" }}>
            {appt.firstName} {appt.lastName}
          </p>
          <p className="text-[#c8953d] text-xs font-bold tracking-wider uppercase mt-0.5">{typeLabel}</p>
        </div>
        <CalendarDays size={20} className="text-[#c8953d] flex-shrink-0 mt-0.5" />
      </div>
      <div className="bg-[#f5f4f0] px-4 py-3 text-sm text-[#555] flex flex-col gap-1">
        <p><span className="font-bold text-[#1b2a3b]">Date: </span>{appt.date}</p>
        <p><span className="font-bold text-[#1b2a3b]">Time: </span>{appt.timeSlot}</p>
        <p><span className="font-bold text-[#1b2a3b]">Duration: </span>60 minutes · Virtual</p>
      </div>
      <div className="flex gap-3 mt-1">
        <button onClick={onReschedule}
          className="flex-1 py-2.5 border border-[#1b2a3b] text-[#1b2a3b] text-xs font-bold tracking-widest uppercase hover:bg-[#1b2a3b] hover:text-white transition-colors"
          style={{ fontFamily: "'Raleway',sans-serif" }}>
          Reschedule
        </button>
        <button onClick={onCancel}
          className="flex-1 py-2.5 border border-red-400 text-red-500 text-xs font-bold tracking-widest uppercase hover:bg-red-50 transition-colors"
          style={{ fontFamily: "'Raleway',sans-serif" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ─── Main modal ─────────────────────────────────────────────────── */
export const BookingModal = ({ isOpen, onClose }: Props) => {
  const [tab, setTab] = useState<"book" | "manage">("book");

  /* Book state */
  const [form, setForm] = useState<BookFormState>({
    firstName: "", lastName: "", phone: "", email: "",
    appointmentType: "", timeSlot: "", hearAboutUs: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calMonth, setCalMonth] = useState(new Date());
  const [bookBookedSlots, setBookBookedSlots] = useState<string[]>([]);
  const [bookErrors, setBookErrors] = useState<Partial<Record<keyof BookFormState | "date", string>>>({});
  const [bookSubmitting, setBookSubmitting] = useState(false);
  const [bookDone, setBookDone] = useState(false);
  const [bookApiError, setBookApiError] = useState("");

  /* Manage state */
  const [lookupEmail, setLookupEmail] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [foundAppts, setFoundAppts] = useState<Appointment[] | null>(null);
  const [activeAppt, setActiveAppt] = useState<Appointment | null>(null);
  const [manageStep, setManageStep] = useState<"lookup" | "view" | "reschedule" | "cancel-confirm" | "done">("lookup");
  const [manageResult, setManageResult] = useState<"updated" | "cancelled">("updated");
  const [resDate, setResDate] = useState<Date | null>(null);
  const [resCalMonth, setResCalMonth] = useState(new Date());
  const [resTimeSlot, setResTimeSlot] = useState("");
  const [resBookedSlots, setResBookedSlots] = useState<string[]>([]);
  const [resErrors, setResErrors] = useState<{ date?: string; timeSlot?: string }>({});
  const [resSubmitting, setResSubmitting] = useState(false);
  const [resApiError, setResApiError] = useState("");
  const [cancelSubmitting, setCancelSubmitting] = useState(false);

  const fetchBookedSlots = async (date: Date): Promise<string[]> => {
    try {
      const dateStr = format(date, "MMMM d, yyyy");
      const res = await fetch(`/api/slots?date=${encodeURIComponent(dateStr)}`);
      const data = await res.json();
      return data.booked ?? [];
    } catch {
      return [];
    }
  };

  if (!isOpen) return null;

  const inputCls = "w-full border border-gray-200 px-4 py-3 text-sm text-[#1b2a3b] focus:outline-none focus:border-[#c8953d] transition-colors";
  const errCls = "text-red-500 text-xs mt-1";
  const labelCls = "block text-xs font-bold tracking-wider uppercase text-[#1b2a3b] mb-1";

  /* ── Book helpers ── */
  const setF = (k: keyof BookFormState, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setBookErrors(e => ({ ...e, [k]: undefined }));
  };
  const validateBook = () => {
    const errs: typeof bookErrors = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.appointmentType) errs.appointmentType = "Please select a type";
    if (!selectedDate) errs.date = "Please select a date";
    if (!form.timeSlot) errs.timeSlot = "Please select a time slot";
    setBookErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleBook = async () => {
    if (!validateBook()) return;
    setBookSubmitting(true);
    setBookApiError("");
    try {
      const res = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName, lastName: form.lastName,
          phone: form.phone, email: form.email,
          appointmentType: form.appointmentType,
          date: format(selectedDate!, "MMMM d, yyyy"),
          timeSlot: form.timeSlot,
          hearAboutUs: form.hearAboutUs || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setBookApiError(data.error || "Booking failed."); return; }
      setBookDone(true);
    } catch { setBookApiError("Something went wrong. Please try again."); }
    finally { setBookSubmitting(false); }
  };

  /* ── Manage helpers ── */
  const handleLookup = async () => {
    if (!lookupEmail.trim() || !/\S+@\S+\.\S+/.test(lookupEmail)) {
      setLookupError("Please enter a valid email address."); return;
    }
    setLookupLoading(true); setLookupError(""); setFoundAppts(null);
    try {
      const res = await fetch(`/api/appointments/lookup?email=${encodeURIComponent(lookupEmail)}`);
      const data = await res.json();
      if (!res.ok) { setLookupError(data.error || "Lookup failed."); return; }
      setFoundAppts(data.appointments);
      if (data.appointments.length > 0) setManageStep("view");
    } catch { setLookupError("Something went wrong. Please try again."); }
    finally { setLookupLoading(false); }
  };

  const handleReschedule = async () => {
    const errs: typeof resErrors = {};
    if (!resDate) errs.date = "Please select a date";
    if (!resTimeSlot) errs.timeSlot = "Please select a time slot";
    setResErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setResSubmitting(true); setResApiError("");
    try {
      const res = await fetch(`/api/appointments/${activeAppt!.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: format(resDate!, "MMMM d, yyyy"), timeSlot: resTimeSlot, email: lookupEmail }),
      });
      const data = await res.json();
      if (!res.ok) { setResApiError(data.error || "Update failed."); return; }
      setManageResult("updated");
      setManageStep("done");
    } catch { setResApiError("Something went wrong."); }
    finally { setResSubmitting(false); }
  };

  const handleCancel = async () => {
    setCancelSubmitting(true);
    try {
      const res = await fetch(`/api/appointments/${activeAppt!.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: lookupEmail }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || "Cancel failed."); return; }
      setManageResult("cancelled");
      setManageStep("done");
    } catch { alert("Something went wrong."); }
    finally { setCancelSubmitting(false); }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setTab("book"); setBookDone(false);
      setForm({ firstName:"",lastName:"",phone:"",email:"",appointmentType:"",timeSlot:"",hearAboutUs:"" });
      setSelectedDate(null); setBookErrors({}); setBookApiError("");
      setLookupEmail(""); setFoundAppts(null); setManageStep("lookup");
      setResDate(null); setResTimeSlot(""); setResErrors({}); setResApiError("");
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative z-10 bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ fontFamily: "'Open Sans',sans-serif" }}>

        {/* Header */}
        <div className="sticky top-0 bg-[#1b2a3b] z-10">
          <div className="px-8 pt-5 pb-0 flex items-start justify-between">
            <div>
              <p className="text-[#c8953d] text-xs tracking-[0.3em] uppercase font-bold"
                style={{ fontFamily: "'Raleway',sans-serif" }}>Sai Life Coaching</p>
              <h2 className="text-white text-xl font-bold mt-0.5" style={{ fontFamily: "'Raleway',sans-serif" }}>
                {tab === "book" ? "Book a Session" : "Manage Appointment"}
              </h2>
            </div>
            <button onClick={handleClose} className="text-white/60 hover:text-white transition-colors mt-1">
              <X size={22} />
            </button>
          </div>
          {/* Tabs */}
          <div className="flex mt-4">
            {(["book", "manage"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${
                  tab === t ? "bg-white text-[#1b2a3b]" : "text-white/60 hover:text-white"
                }`}
                style={{ fontFamily: "'Raleway',sans-serif" }}>
                {t === "book" ? "Book a Session" : "Manage Appointment"}
              </button>
            ))}
          </div>
        </div>

        {/* ══ BOOK TAB ══ */}
        {tab === "book" && (
          bookDone ? (
            <div className="flex flex-col items-center text-center px-8 py-16 gap-6">
              <CheckCircle size={56} className="text-[#c8953d]" />
              <h3 className="text-[#1b2a3b] text-2xl font-bold" style={{ fontFamily: "'Raleway',sans-serif" }}>
                You're All Set!
              </h3>
              <p className="text-[#555] text-sm leading-relaxed max-w-sm">
                Confirmation sent to <strong>{form.email}</strong>. Check your inbox — a calendar invite is attached so you can add it to Google Calendar or any email app.
              </p>
              <div className="w-full bg-[#f5f4f0] border-l-4 border-[#c8953d] px-6 py-4 text-left text-sm text-[#555]">
                <p className="font-bold text-[#1b2a3b] mb-1">Next steps:</p>
                Coach SP will send the video conference link before your session. This is a virtual appointment.
              </div>
              <button onClick={handleClose}
                className="px-10 py-3 bg-[#c8953d] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#b07e2c] transition-colors"
                style={{ fontFamily: "'Raleway',sans-serif" }}>
                Close
              </button>
            </div>
          ) : (
            <div className="px-8 py-8 flex flex-col gap-8">
              {/* Customer info */}
              <div>
                <SectionHeading>1. Your Information</SectionHeading>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelCls}>First Name</label>
                    <input className={inputCls} value={form.firstName} onChange={e => setF("firstName", e.target.value)} placeholder="Jane" />
                    {bookErrors.firstName && <p className={errCls}>{bookErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Last Name</label>
                    <input className={inputCls} value={form.lastName} onChange={e => setF("lastName", e.target.value)} placeholder="Doe" />
                    {bookErrors.lastName && <p className={errCls}>{bookErrors.lastName}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className={labelCls}>Phone Number</label>
                  <input className={inputCls} value={form.phone} onChange={e => setF("phone", e.target.value)} placeholder="(925) 000-0000" />
                  {bookErrors.phone && <p className={errCls}>{bookErrors.phone}</p>}
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input className={inputCls} type="email" value={form.email} onChange={e => setF("email", e.target.value)} placeholder="jane@example.com" />
                  {bookErrors.email && <p className={errCls}>{bookErrors.email}</p>}
                </div>
              </div>

              {/* Appointment type */}
              <div>
                <SectionHeading>2. Appointment Type</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {APPOINTMENT_TYPES.map(t => (
                    <button key={t.value} onClick={() => setF("appointmentType", t.value)}
                      className={`border px-4 py-4 text-left text-sm font-medium transition-all ${
                        form.appointmentType === t.value
                          ? "border-[#c8953d] bg-[#c8953d]/10 text-[#1b2a3b]"
                          : "border-gray-200 text-[#555] hover:border-[#c8953d]/50"
                      }`}>
                      {t.label}
                    </button>
                  ))}
                </div>
                {bookErrors.appointmentType && <p className={errCls}>{bookErrors.appointmentType}</p>}
                <div className="mt-4 flex items-center gap-3 bg-[#f5f4f0] px-4 py-3">
                  <span className="text-[#c8953d] font-bold text-xs uppercase tracking-widest" style={{ fontFamily: "'Raleway',sans-serif" }}>Duration</span>
                  <span className="text-[#1b2a3b] text-sm font-medium">60 minutes · Virtual</span>
                </div>
              </div>

              {/* Calendar */}
              <div>
                <SectionHeading>3. Select Date</SectionHeading>
                <p className="text-xs text-[#888] mb-3">Monday – Friday · Up to 2 months ahead</p>
                <Calendar selected={selectedDate} onSelect={async d => {
                    setSelectedDate(d);
                    setF("timeSlot", "");
                    setBookErrors(e => ({ ...e, date: undefined }));
                    const booked = await fetchBookedSlots(d);
                    setBookBookedSlots(booked);
                  }}
                  calendarMonth={calMonth} setCalendarMonth={setCalMonth} />
                {bookErrors.date && <p className={errCls}>{bookErrors.date}</p>}
                {selectedDate && (
                  <p className="text-xs text-[#c8953d] font-bold mt-2">
                    Selected: {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </p>
                )}
              </div>

              {/* Time */}
              <div>
                <SectionHeading>4. Select Time</SectionHeading>
                <TimeSlotPicker selected={form.timeSlot} onSelect={v => setF("timeSlot", v)} error={bookErrors.timeSlot} bookedSlots={bookBookedSlots} />
              </div>

              {/* Referral */}
              <div>
                <SectionHeading>5. How Did You Hear About Us?</SectionHeading>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {HEAR_ABOUT_OPTIONS.map(opt => (
                    <button key={opt}
                      onClick={() => setF("hearAboutUs", form.hearAboutUs === opt ? "" : opt)}
                      className={`border px-3 py-2 text-xs font-medium transition-all ${
                        form.hearAboutUs === opt
                          ? "border-[#c8953d] bg-[#c8953d]/10 text-[#1b2a3b]"
                          : "border-gray-200 text-[#555] hover:border-[#c8953d]/50"
                      }`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notice */}
              <div className="bg-[#f5f4f0] border-l-4 border-[#c8953d] px-6 py-4 text-sm text-[#555] leading-relaxed">
                <span className="font-bold text-[#1b2a3b]">Virtual Appointment: </span>
                Coach SP will share the video conference details via email before your session.
              </div>

              {bookApiError && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">
                  <AlertTriangle size={16} className="flex-shrink-0" />
                  {bookApiError}
                </div>
              )}

              <button onClick={handleBook} disabled={bookSubmitting}
                className="w-full py-4 bg-[#c8953d] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#b07e2c] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ fontFamily: "'Raleway',sans-serif" }}>
                {bookSubmitting && <Loader2 size={16} className="animate-spin" />}
                {bookSubmitting ? "Booking..." : "Book My Session"}
              </button>
            </div>
          )
        )}

        {/* ══ MANAGE TAB ══ */}
        {tab === "manage" && (
          <div className="px-8 py-8 flex flex-col gap-6">

            {/* Lookup step */}
            {manageStep === "lookup" && (
              <>
                <div>
                  <SectionHeading>Find Your Appointment</SectionHeading>
                  <p className="text-sm text-[#555] mb-4">Enter the email address you used when booking.</p>
                  <label className={labelCls}>Email Address</label>
                  <div className="flex gap-2">
                    <input className={`${inputCls} flex-1`} type="email" value={lookupEmail}
                      onChange={e => { setLookupEmail(e.target.value); setLookupError(""); }}
                      placeholder="jane@example.com"
                      onKeyDown={e => e.key === "Enter" && handleLookup()} />
                    <button onClick={handleLookup} disabled={lookupLoading}
                      className="px-5 bg-[#1b2a3b] text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-[#c8953d] transition-colors disabled:opacity-60"
                      style={{ fontFamily: "'Raleway',sans-serif" }}>
                      {lookupLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                      {lookupLoading ? "" : "Look Up"}
                    </button>
                  </div>
                  {lookupError && <p className={errCls}>{lookupError}</p>}
                </div>
                {foundAppts !== null && foundAppts.length === 0 && (
                  <div className="text-center py-8 text-[#888] text-sm">
                    No active appointments found for <strong>{lookupEmail}</strong>.
                  </div>
                )}
              </>
            )}

            {/* View appointments */}
            {manageStep === "view" && foundAppts && (
              <>
                <div>
                  <SectionHeading>Your Appointments</SectionHeading>
                  <p className="text-sm text-[#555] mb-4">
                    Found {foundAppts.length} active appointment{foundAppts.length !== 1 ? "s" : ""} for <strong>{lookupEmail}</strong>.
                  </p>
                  <div className="flex flex-col gap-4">
                    {foundAppts.map(appt => (
                      <ApptCard key={appt.id} appt={appt}
                        onReschedule={() => { setActiveAppt(appt); setResDate(null); setResTimeSlot(""); setManageStep("reschedule"); }}
                        onCancel={() => { setActiveAppt(appt); setManageStep("cancel-confirm"); }} />
                    ))}
                  </div>
                </div>
                <button onClick={() => { setManageStep("lookup"); setFoundAppts(null); setLookupEmail(""); }}
                  className="text-xs text-[#888] hover:text-[#1b2a3b] underline self-start">
                  ← Search a different email
                </button>
              </>
            )}

            {/* Reschedule */}
            {manageStep === "reschedule" && activeAppt && (
              <>
                <div>
                  <SectionHeading>Reschedule Appointment</SectionHeading>
                  <div className="bg-[#f5f4f0] px-4 py-3 text-sm text-[#555] mb-4">
                    Current: <strong>{activeAppt.date} · {activeAppt.timeSlot}</strong>
                  </div>

                  <p className="text-xs font-bold tracking-wider uppercase text-[#1b2a3b] mb-2">
                    New Date <span className="text-[#888] font-normal normal-case tracking-normal">(Monday – Friday)</span>
                  </p>
                  <Calendar selected={resDate} onSelect={async d => {
                      setResDate(d);
                      setResTimeSlot("");
                      setResErrors(e => ({ ...e, date: undefined }));
                      const booked = await fetchBookedSlots(d);
                      // Exclude the current appointment's own slot so it's still selectable
                      setResBookedSlots(booked.filter(s => s !== activeAppt?.timeSlot || d.toDateString() !== new Date(activeAppt?.date ?? "").toDateString()));
                    }}
                    calendarMonth={resCalMonth} setCalendarMonth={setResCalMonth} />
                  {resErrors.date && <p className={errCls}>{resErrors.date}</p>}
                  {resDate && (
                    <p className="text-xs text-[#c8953d] font-bold mt-2">
                      Selected: {format(resDate, "EEEE, MMMM d, yyyy")}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold tracking-wider uppercase text-[#1b2a3b] mb-3">New Time Slot</p>
                  <TimeSlotPicker selected={resTimeSlot} onSelect={v => { setResTimeSlot(v); setResErrors(e => ({ ...e, timeSlot: undefined })); }} error={resErrors.timeSlot} bookedSlots={resBookedSlots} />
                </div>

                {resApiError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">
                    <AlertTriangle size={16} className="flex-shrink-0" />
                    {resApiError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setManageStep("view")}
                    className="flex-1 py-3 border border-gray-300 text-[#555] text-xs font-bold uppercase tracking-widest hover:border-[#1b2a3b] transition-colors"
                    style={{ fontFamily: "'Raleway',sans-serif" }}>
                    Back
                  </button>
                  <button onClick={handleReschedule} disabled={resSubmitting}
                    className="flex-1 py-3 bg-[#c8953d] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#b07e2c] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Raleway',sans-serif" }}>
                    {resSubmitting && <Loader2 size={16} className="animate-spin" />}
                    {resSubmitting ? "Saving..." : "Confirm Reschedule"}
                  </button>
                </div>
              </>
            )}

            {/* Cancel confirm */}
            {manageStep === "cancel-confirm" && activeAppt && (
              <div className="flex flex-col gap-5">
                <SectionHeading>Cancel Appointment</SectionHeading>
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-700">
                  <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                  <p>Are you sure you want to cancel this appointment? This cannot be undone.</p>
                </div>
                <div className="bg-[#f5f4f0] px-4 py-3 text-sm text-[#555] flex flex-col gap-1">
                  <p><span className="font-bold text-[#1b2a3b]">Date: </span>{activeAppt.date}</p>
                  <p><span className="font-bold text-[#1b2a3b]">Time: </span>{activeAppt.timeSlot}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setManageStep("view")}
                    className="flex-1 py-3 border border-gray-300 text-[#555] text-xs font-bold uppercase tracking-widest hover:border-[#1b2a3b] transition-colors"
                    style={{ fontFamily: "'Raleway',sans-serif" }}>
                    Keep Appointment
                  </button>
                  <button onClick={handleCancel} disabled={cancelSubmitting}
                    className="flex-1 py-3 bg-red-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Raleway',sans-serif" }}>
                    {cancelSubmitting && <Loader2 size={16} className="animate-spin" />}
                    {cancelSubmitting ? "Cancelling..." : "Yes, Cancel It"}
                  </button>
                </div>
              </div>
            )}

            {/* Done */}
            {manageStep === "done" && (
              <div className="flex flex-col items-center text-center gap-6 py-8">
                <CheckCircle size={56} className="text-[#c8953d]" />
                <h3 className="text-[#1b2a3b] text-2xl font-bold" style={{ fontFamily: "'Raleway',sans-serif" }}>
                  {manageResult === "updated" ? "Appointment Rescheduled!" : "Appointment Cancelled"}
                </h3>
                <p className="text-[#555] text-sm leading-relaxed max-w-sm">
                  {manageResult === "updated"
                    ? "A confirmation email with an updated calendar invite has been sent to your inbox."
                    : "Your appointment has been cancelled and a confirmation email has been sent."}
                </p>
                <button onClick={handleClose}
                  className="px-10 py-3 bg-[#c8953d] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#b07e2c] transition-colors"
                  style={{ fontFamily: "'Raleway',sans-serif" }}>
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
