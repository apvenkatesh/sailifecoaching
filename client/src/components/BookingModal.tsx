import { useState } from "react";
import { X, ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isBefore,
  startOfDay,
  addMonths,
  subMonths,
  isSameDay,
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
  "Instagram",
  "Facebook",
  "Google Search",
  "Friend / Family Referral",
  "MindValley",
  "Other",
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  appointmentType: string;
  timeSlot: string;
  hearAboutUs: string;
}

export const BookingModal = ({ isOpen, onClose }: Props) => {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    appointmentType: "",
    timeSlot: "",
    hearAboutUs: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "date", string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const set = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.appointmentType) errs.appointmentType = "Please select a type";
    if (!selectedDate) errs.date = "Please select a date";
    if (!form.timeSlot) errs.timeSlot = "Please select a time slot";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          appointmentType: form.appointmentType,
          date: format(selectedDate!, "MMMM d, yyyy"),
          timeSlot: form.timeSlot,
          hearAboutUs: form.hearAboutUs || null,
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ firstName: "", lastName: "", phone: "", email: "", appointmentType: "", timeSlot: "", hearAboutUs: "" });
      setSelectedDate(null);
      setErrors({});
    }, 300);
  };

  /* ---- Calendar helpers ---- */
  const today = startOfDay(new Date());
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = getDay(monthStart); // 0=Sun … 6=Sat
  const isDisabled = (d: Date) => isBefore(d, today) || getDay(d) === 0 || getDay(d) === 6;

  /* ---- Styles ---- */
  const label = "block text-xs font-bold tracking-wider uppercase text-[#1b2a3b] mb-1";
  const input =
    "w-full border border-gray-200 px-4 py-3 text-sm text-[#1b2a3b] focus:outline-none focus:border-[#c8953d] transition-colors";
  const errMsg = "text-red-500 text-xs mt-1";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal card */}
      <div
        className="relative z-10 bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1b2a3b] px-8 py-5 flex items-center justify-between z-10">
          <div>
            <p className="text-[#c8953d] text-xs tracking-[0.3em] uppercase font-bold" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Sai Life Coaching
            </p>
            <h2 className="text-white text-xl font-bold mt-0.5" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Book a Session
            </h2>
          </div>
          <button onClick={handleClose} className="text-white/60 hover:text-white transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Success state */}
        {submitted ? (
          <div className="flex flex-col items-center text-center px-8 py-16 gap-6">
            <CheckCircle size={56} className="text-[#c8953d]" />
            <h3 className="text-[#1b2a3b] text-2xl font-bold" style={{ fontFamily: "'Raleway', sans-serif" }}>
              You're All Set!
            </h3>
            <p className="text-[#555] text-sm leading-relaxed max-w-sm">
              Your appointment has been booked. A confirmation email has been sent to <strong>{form.email}</strong> with all the details.
            </p>
            <div className="w-full bg-[#f5f4f0] border-l-4 border-[#c8953d] px-6 py-4 text-left text-sm text-[#555]">
              <p className="font-bold text-[#1b2a3b] mb-1">What's next?</p>
              Coach SP will send you the video conference link prior to your session. This is a virtual appointment.
            </div>
            <button
              onClick={handleClose}
              className="px-10 py-3 bg-[#c8953d] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#b07e2c] transition-colors"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="px-8 py-8 flex flex-col gap-8">
            {/* Section 1 — Customer Info */}
            <div>
              <SectionHeading>1. Your Information</SectionHeading>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={label}>First Name</label>
                  <input className={input} value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Jane" />
                  {errors.firstName && <p className={errMsg}>{errors.firstName}</p>}
                </div>
                <div>
                  <label className={label}>Last Name</label>
                  <input className={input} value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Doe" />
                  {errors.lastName && <p className={errMsg}>{errors.lastName}</p>}
                </div>
              </div>
              <div className="mb-4">
                <label className={label}>Phone Number</label>
                <input className={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(925) 000-0000" />
                {errors.phone && <p className={errMsg}>{errors.phone}</p>}
              </div>
              <div>
                <label className={label}>Email</label>
                <input className={input} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jane@example.com" />
                {errors.email && <p className={errMsg}>{errors.email}</p>}
              </div>
            </div>

            {/* Section 2 — Appointment Type */}
            <div>
              <SectionHeading>2. Appointment Type</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {APPOINTMENT_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => { set("appointmentType", t.value); }}
                    className={`border px-4 py-4 text-left text-sm font-medium transition-all ${
                      form.appointmentType === t.value
                        ? "border-[#c8953d] bg-[#c8953d]/10 text-[#1b2a3b]"
                        : "border-gray-200 text-[#555] hover:border-[#c8953d]/50"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {errors.appointmentType && <p className={errMsg}>{errors.appointmentType}</p>}

              <div className="mt-4 flex items-center gap-3 bg-[#f5f4f0] px-4 py-3">
                <span className="text-[#c8953d] font-bold text-xs uppercase tracking-widest" style={{ fontFamily: "'Raleway', sans-serif" }}>Duration</span>
                <span className="text-[#1b2a3b] text-sm font-medium">60 minutes</span>
              </div>
            </div>

            {/* Section 3 — Calendar */}
            <div>
              <SectionHeading>3. Select Date</SectionHeading>
              <p className="text-xs text-[#888] mb-3">Available Monday – Friday only</p>
              <div className="border border-gray-200 p-4">
                {/* Month nav */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCalendarMonth((m) => subMonths(m, 1))}
                    className="p-1 hover:text-[#c8953d] transition-colors text-[#1b2a3b]"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm font-bold text-[#1b2a3b]" style={{ fontFamily: "'Raleway', sans-serif" }}>
                    {format(calendarMonth, "MMMM yyyy")}
                  </span>
                  <button
                    onClick={() => setCalendarMonth((m) => addMonths(m, 1))}
                    className="p-1 hover:text-[#c8953d] transition-colors text-[#1b2a3b]"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-1">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} className="text-center text-[10px] font-bold text-[#999] uppercase py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7">
                  {Array.from({ length: startPad }).map((_, i) => (
                    <div key={`pad-${i}`} />
                  ))}
                  {days.map((day) => {
                    const disabled = isDisabled(day);
                    const selected = selectedDate && isSameDay(day, selectedDate);
                    return (
                      <button
                        key={day.toISOString()}
                        disabled={disabled}
                        onClick={() => {
                          setSelectedDate(day);
                          setErrors((e) => ({ ...e, date: undefined }));
                        }}
                        className={`aspect-square flex items-center justify-center text-sm rounded-full m-0.5 transition-all ${
                          selected
                            ? "bg-[#c8953d] text-white font-bold"
                            : disabled
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-[#1b2a3b] hover:bg-[#c8953d]/15"
                        }`}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>
              {errors.date && <p className={errMsg}>{errors.date}</p>}
              {selectedDate && (
                <p className="text-xs text-[#c8953d] font-bold mt-2">
                  Selected: {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </p>
              )}
            </div>

            {/* Section 4 — Time Slots */}
            <div>
              <SectionHeading>4. Select Time</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => set("timeSlot", slot)}
                    className={`border px-3 py-4 text-sm font-medium text-center transition-all ${
                      form.timeSlot === slot
                        ? "border-[#c8953d] bg-[#c8953d]/10 text-[#1b2a3b] font-bold"
                        : "border-gray-200 text-[#555] hover:border-[#c8953d]/50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.timeSlot && <p className={errMsg}>{errors.timeSlot}</p>}
            </div>

            {/* Section 5 — How did you hear */}
            <div>
              <SectionHeading>5. How Did You Hear About Us?</SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {HEAR_ABOUT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => set("hearAboutUs", form.hearAboutUs === opt ? "" : opt)}
                    className={`border px-3 py-2 text-xs font-medium transition-all ${
                      form.hearAboutUs === opt
                        ? "border-[#c8953d] bg-[#c8953d]/10 text-[#1b2a3b]"
                        : "border-gray-200 text-[#555] hover:border-[#c8953d]/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Virtual notice */}
            <div className="bg-[#f5f4f0] border-l-4 border-[#c8953d] px-6 py-4 text-sm text-[#555] leading-relaxed">
              <span className="font-bold text-[#1b2a3b]">Virtual Appointment: </span>
              Coach SP will share the video conference details via email prior to your session.
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-[#c8953d] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#b07e2c] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {isSubmitting ? "Booking..." : "Book My Session"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h3
    className="text-[#1b2a3b] text-sm font-bold tracking-wider uppercase mb-4 pb-2 border-b border-gray-100"
    style={{ fontFamily: "'Raleway', sans-serif" }}
  >
    {children}
  </h3>
);
