import { useState } from "react";
import { X, Users, CheckCircle, Loader2, Search, AlertTriangle, ExternalLink } from "lucide-react";

interface Workshop {
  id: string;
  title: string;
  detailsUrl: string;
  sessions: string[];
  totalSlots: number;
  signedUp: number;
  availableSlots: number;
}

interface EnrichedSignup {
  id: string;
  workshopId: string;
  workshopTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const inputCls = "w-full border border-gray-200 px-4 py-3 text-sm text-[#1b2a3b] focus:outline-none focus:border-[#c8953d] transition-colors";
const labelCls = "block text-xs font-bold tracking-wider uppercase text-[#1b2a3b] mb-1";
const errCls = "text-red-500 text-xs mt-1";

function toEmbedUrl(url: string): string {
  const gdocMatch = url.match(/docs\.google\.com\/document\/d\/([^/]+)/);
  if (gdocMatch) return `https://docs.google.com/document/d/${gdocMatch[1]}/pub?embedded=true`;
  return url;
}

type Tab = "details" | "signup" | "cancel";

export const WorkshopModal = ({ isOpen, onClose }: Props) => {
  const [tab, setTab] = useState<Tab>("details");

  /* ── Workshops state ── */
  const [workshops, setWorkshops] = useState<Workshop[] | null>(null);
  const [loadingWorkshops, setLoadingWorkshops] = useState(false);
  const [workshopsError, setWorkshopsError] = useState("");

  /* ── Details tab state ── */
  const [selectedDetail, setSelectedDetail] = useState<Workshop | null>(null);
  const [iframeError, setIframeError] = useState(false);

  /* ── Signup state ── */
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "" });
  const [formErrors, setFormErrors] = useState<Partial<typeof form & { workshop: string }>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [done, setDone] = useState(false);

  /* ── Cancel state ── */
  const [lookupEmail, setLookupEmail] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [foundSignups, setFoundSignups] = useState<EnrichedSignup[] | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelApiError, setCancelApiError] = useState("");
  const [cancelDone, setCancelDone] = useState(false);

  if (!isOpen) return null;

  /* ── Fetch workshops (shared) ── */
  const loadWorkshops = async () => {
    if (workshops !== null) return;
    setLoadingWorkshops(true);
    setWorkshopsError("");
    try {
      const res = await fetch("/api/workshops");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setWorkshops(data.workshops);
      if (data.workshops?.length > 0) setSelectedDetail(data.workshops[0]);
    } catch (e: any) {
      setWorkshopsError(e.message || "Failed to load workshops");
    } finally {
      setLoadingWorkshops(false);
    }
  };

  if (workshops === null && !loadingWorkshops && !workshopsError) {
    loadWorkshops();
  }

  /* ── Form helpers ── */
  const setF = (k: keyof typeof form, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setFormErrors(e => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const errs: typeof formErrors = {};
    if (!selectedWorkshop) errs.workshop = "Please select a workshop";
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setApiError("");
    try {
      const res = await fetch("/api/workshop-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workshopId: selectedWorkshop!.id, ...form }),
      });
      const data = await res.json();
      if (!res.ok) { setApiError(data.error || "Signup failed"); return; }
      setDone(true);
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Cancel helpers ── */
  const handleLookup = async () => {
    if (!lookupEmail.trim()) { setLookupError("Enter your email"); return; }
    setLookupLoading(true);
    setLookupError("");
    try {
      const res = await fetch(`/api/workshop-signups/lookup?email=${encodeURIComponent(lookupEmail)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFoundSignups(data.signups);
      if (data.signups.length === 0) setLookupError("No active workshop registrations found for this email.");
    } catch (e: any) {
      setLookupError(e.message || "Lookup failed");
    } finally {
      setLookupLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    setCancellingId(id);
    setCancelApiError("");
    try {
      const res = await fetch(`/api/workshop-signups/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: lookupEmail }),
      });
      const data = await res.json();
      if (!res.ok) { setCancelApiError(data.error || "Cancel failed"); return; }
      setCancelDone(true);
      setFoundSignups(prev => prev?.filter(s => s.id !== id) ?? null);
    } catch {
      setCancelApiError("Something went wrong.");
    } finally {
      setCancellingId(null);
    }
  };

  const handleClose = () => {
    setTab("details");
    setWorkshops(null);
    setSelectedDetail(null);
    setIframeError(false);
    setSelectedWorkshop(null);
    setForm({ firstName: "", lastName: "", phone: "", email: "" });
    setFormErrors({});
    setApiError("");
    setDone(false);
    setLookupEmail("");
    setFoundSignups(null);
    setLookupError("");
    setCancelDone(false);
    setCancelApiError("");
    onClose();
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "details", label: "Workshop Details" },
    { key: "signup", label: "Join Workshop" },
    { key: "cancel", label: "Cancel Registration" },
  ];

  const loadingBlock = (
    <div className="flex items-center gap-3 text-[#1b2a3b] py-10 justify-center">
      <Loader2 size={18} className="animate-spin" />
      <span className="text-sm">Loading workshops…</span>
    </div>
  );
  const errorBlock = (
    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">
      <AlertTriangle size={16} />
      {workshopsError}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8">
      <div className="relative w-full max-w-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-[#1b2a3b] px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users size={22} className="text-[#c8953d]" />
            <h2 className="text-white text-lg font-bold tracking-wider uppercase" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Group Workshops
            </h2>
          </div>
          <button onClick={handleClose} className="text-white/60 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-colors ${
                tab === t.key ? "border-b-2 border-[#c8953d] text-[#1b2a3b]" : "text-gray-400 hover:text-[#1b2a3b]"
              }`} style={{ fontFamily: "'Raleway', sans-serif" }}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="px-8 py-8 space-y-8">

          {/* ── DETAILS TAB ── */}
          {tab === "details" && (
            <>
              {loadingWorkshops && loadingBlock}
              {workshopsError && errorBlock}
              {workshops && workshops.length === 0 && (
                <p className="text-sm text-gray-500 italic text-center py-6">No upcoming workshops at this time. Check back soon!</p>
              )}
              {workshops && workshops.length > 0 && (
                <>
                  {/* Workshop selector (if multiple) */}
                  {workshops.length > 1 && (
                    <div className="flex gap-2 flex-wrap">
                      {workshops.map(w => (
                        <button key={w.id} onClick={() => { setSelectedDetail(w); setIframeError(false); }}
                          className={`px-5 py-2 text-xs font-bold tracking-wider uppercase border transition-colors ${
                            selectedDetail?.id === w.id
                              ? "border-[#c8953d] bg-[#c8953d] text-white"
                              : "border-gray-300 text-[#1b2a3b] hover:border-[#c8953d]"
                          }`} style={{ fontFamily: "'Raleway', sans-serif" }}>
                          {w.title}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Selected workshop detail */}
                  {selectedDetail && (
                    <div>
                      <h3 className="text-[#1b2a3b] text-base font-bold mb-4" style={{ fontFamily: "'Raleway', sans-serif" }}>
                        {selectedDetail.title}
                      </h3>

                      {/* Sessions list */}
                      {(selectedDetail.sessions?.length ?? 0) > 0 && (
                        <div className="mb-6">
                          <p className="text-xs font-bold tracking-wider uppercase text-[#1b2a3b] mb-3" style={{ fontFamily: "'Raleway', sans-serif" }}>
                            Session Schedule
                          </p>
                          <div className="space-y-2">
                            {selectedDetail.sessions.map((s, i) => (
                              <div key={i} className="flex gap-4 items-start py-2 border-b border-gray-100 last:border-0">
                                <span className="text-xs font-bold text-[#c8953d] w-16 flex-shrink-0 pt-0.5" style={{ fontFamily: "'Raleway', sans-serif" }}>
                                  Session {i + 1}
                                </span>
                                <span className="text-sm text-[#1b2a3b]">{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Details link content */}
                      {selectedDetail.detailsUrl && !iframeError && (
                        <div className="border border-gray-200">
                          <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b border-gray-200">
                            <span className="text-xs font-bold tracking-wider uppercase text-[#1b2a3b]" style={{ fontFamily: "'Raleway', sans-serif" }}>
                              Workshop Details
                            </span>
                            <a href={selectedDetail.detailsUrl} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-[#c8953d] font-bold hover:underline">
                              <ExternalLink size={12} /> Open
                            </a>
                          </div>
                          <iframe
                            src={toEmbedUrl(selectedDetail.detailsUrl)}
                            className="w-full"
                            style={{ height: "360px", border: "none" }}
                            onError={() => setIframeError(true)}
                            title={`${selectedDetail.title} details`}
                          />
                        </div>
                      )}

                      {selectedDetail.detailsUrl && iframeError && (
                        <a href={selectedDetail.detailsUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 border border-[#c8953d] text-[#c8953d] text-xs font-bold tracking-wider uppercase hover:bg-[#c8953d] hover:text-white transition-colors w-fit"
                          style={{ fontFamily: "'Raleway', sans-serif" }}>
                          <ExternalLink size={14} /> View Full Details
                        </a>
                      )}

                      {!selectedDetail.detailsUrl && (
                        <p className="text-sm text-gray-500 italic">Full details coming soon.</p>
                      )}

                      {/* Slots info */}
                      <div className="mt-6 flex items-center gap-2">
                        <span className={`text-xs font-bold ${selectedDetail.availableSlots === 0 ? "text-red-400" : "text-[#c8953d]"}`}>
                          {selectedDetail.availableSlots === 0 ? "Fully Booked" : `${selectedDetail.availableSlots} of ${selectedDetail.totalSlots} spots remaining`}
                        </span>
                      </div>

                      {selectedDetail.availableSlots > 0 && (
                        <button onClick={() => { setSelectedWorkshop(selectedDetail); setTab("signup"); }}
                          className="mt-4 px-8 py-3 bg-[#c8953d] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#b07e2c] transition-colors"
                          style={{ fontFamily: "'Raleway', sans-serif" }}>
                          Join This Workshop
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* ── SIGNUP TAB ── */}
          {tab === "signup" && !done && (
            <>
              {/* Workshop selection */}
              <div>
                <h3 className="text-[#1b2a3b] text-sm font-bold tracking-wider uppercase mb-4 pb-2 border-b border-gray-100"
                  style={{ fontFamily: "'Raleway', sans-serif" }}>
                  1. Select a Workshop
                </h3>

                {loadingWorkshops && loadingBlock}
                {workshopsError && errorBlock}
                {workshops && workshops.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No upcoming workshops at this time. Check back soon!</p>
                )}
                {workshops && workshops.map(w => {
                  const full = w.availableSlots === 0;
                  const selected = selectedWorkshop?.id === w.id;
                  return (
                    <div key={w.id}
                      onClick={() => !full && setSelectedWorkshop(w)}
                      className={`mb-4 border p-5 transition-all ${
                        full ? "border-gray-100 opacity-60 cursor-not-allowed"
                          : selected ? "border-[#c8953d] bg-[#c8953d]/5 cursor-pointer"
                          : "border-gray-200 hover:border-[#c8953d]/50 cursor-pointer"
                      }`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${selected ? "border-[#c8953d] bg-[#c8953d]" : "border-gray-300"}`} />
                            <p className="font-bold text-[#1b2a3b] text-sm" style={{ fontFamily: "'Raleway', sans-serif" }}>{w.title}</p>
                          </div>
                          {(w.sessions?.length ?? 0) > 0 && (
                            <div className="ml-6 space-y-1">
                              {w.sessions.map((s, i) => (
                                <p key={i} className="text-xs text-[#666]">
                                  <span className="font-semibold text-[#c8953d]">Session {i + 1}:</span> {s}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-xs font-bold ${full ? "text-red-400" : "text-[#c8953d]"}`}>
                            {full ? "Full" : `${w.availableSlots} / ${w.totalSlots} spots left`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {formErrors.workshop && <p className={errCls}>{formErrors.workshop}</p>}
              </div>

              {/* Personal info */}
              <div>
                <h3 className="text-[#1b2a3b] text-sm font-bold tracking-wider uppercase mb-4 pb-2 border-b border-gray-100"
                  style={{ fontFamily: "'Raleway', sans-serif" }}>
                  2. Your Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>First Name</label>
                    <input value={form.firstName} onChange={e => setF("firstName", e.target.value)} className={inputCls} data-testid="input-firstName" />
                    {formErrors.firstName && <p className={errCls}>{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Last Name</label>
                    <input value={form.lastName} onChange={e => setF("lastName", e.target.value)} className={inputCls} data-testid="input-lastName" />
                    {formErrors.lastName && <p className={errCls}>{formErrors.lastName}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setF("phone", e.target.value)} className={inputCls} data-testid="input-phone" />
                    {formErrors.phone && <p className={errCls}>{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Email</label>
                    <input type="email" value={form.email} onChange={e => setF("email", e.target.value)} className={inputCls} data-testid="input-email" />
                    {formErrors.email && <p className={errCls}>{formErrors.email}</p>}
                  </div>
                </div>
              </div>

              {apiError && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">
                  <AlertTriangle size={16} />
                  {apiError}
                </div>
              )}

              <button onClick={handleSignup} disabled={submitting}
                className="w-full py-4 bg-[#c8953d] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#b07e2c] disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: "'Raleway', sans-serif" }} data-testid="button-join-workshop">
                {submitting ? <><Loader2 size={16} className="animate-spin" /> Processing…</> : "Confirm Registration"}
              </button>
            </>
          )}

          {/* ── SIGNUP SUCCESS ── */}
          {tab === "signup" && done && (
            <div className="text-center py-8">
              <CheckCircle size={56} className="text-[#c8953d] mx-auto mb-4" />
              <h3 className="text-[#1b2a3b] text-2xl font-bold mb-2" style={{ fontFamily: "'Raleway', sans-serif" }}>
                You're Registered!
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                A confirmation email has been sent to <strong>{form.email}</strong>.
              </p>
              {selectedWorkshop && (
                <div className="text-left border border-gray-100 p-5 mb-6 inline-block w-full max-w-sm text-left">
                  <p className="font-bold text-[#1b2a3b] text-sm mb-3" style={{ fontFamily: "'Raleway', sans-serif" }}>
                    {selectedWorkshop.title}
                  </p>
                  {(selectedWorkshop.sessions ?? []).map((s, i) => (
                    <p key={i} className="text-xs text-[#555] mb-1">
                      <span className="font-semibold text-[#c8953d]">Session {i + 1}:</span> {s}
                    </p>
                  ))}
                </div>
              )}
              <button onClick={handleClose}
                className="px-10 py-3 bg-[#1b2a3b] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#c8953d] transition-colors"
                style={{ fontFamily: "'Raleway', sans-serif" }}>
                Close
              </button>
            </div>
          )}

          {/* ── CANCEL TAB ── */}
          {tab === "cancel" && (
            <>
              <div>
                <h3 className="text-[#1b2a3b] text-sm font-bold tracking-wider uppercase mb-4 pb-2 border-b border-gray-100"
                  style={{ fontFamily: "'Raleway', sans-serif" }}>
                  Find Your Registration
                </h3>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className={labelCls}>Your Email</label>
                    <input type="email" value={lookupEmail} onChange={e => { setLookupEmail(e.target.value); setLookupError(""); setFoundSignups(null); setCancelDone(false); }}
                      onKeyDown={e => e.key === "Enter" && handleLookup()}
                      placeholder="you@example.com" className={inputCls} data-testid="input-lookup-email" />
                  </div>
                  <div className="flex items-end">
                    <button onClick={handleLookup} disabled={lookupLoading}
                      className="px-6 py-3 bg-[#1b2a3b] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#c8953d] transition-colors flex items-center gap-2 disabled:opacity-60"
                      style={{ fontFamily: "'Raleway', sans-serif" }}>
                      {lookupLoading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                      Look Up
                    </button>
                  </div>
                </div>
                {lookupError && <p className={errCls + " mt-2"}>{lookupError}</p>}
              </div>

              {cancelDone && (
                <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3 text-sm">
                  <CheckCircle size={16} />
                  Registration cancelled successfully. A confirmation email has been sent.
                </div>
              )}
              {cancelApiError && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">
                  <AlertTriangle size={16} />
                  {cancelApiError}
                </div>
              )}

              {foundSignups && foundSignups.length > 0 && (
                <div>
                  <h3 className="text-[#1b2a3b] text-sm font-bold tracking-wider uppercase mb-4 pb-2 border-b border-gray-100"
                    style={{ fontFamily: "'Raleway', sans-serif" }}>
                    Your Registrations
                  </h3>
                  <div className="space-y-4">
                    {foundSignups.map(s => (
                      <div key={s.id} className="border border-gray-200 p-5">
                        <p className="font-bold text-[#1b2a3b] text-sm mb-3" style={{ fontFamily: "'Raleway', sans-serif" }}>{s.workshopTitle}</p>
                        <button onClick={() => handleCancel(s.id)} disabled={cancellingId === s.id}
                          className="px-6 py-2 border border-red-400 text-red-500 text-xs font-bold tracking-wider uppercase hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-60"
                          style={{ fontFamily: "'Raleway', sans-serif" }}>
                          {cancellingId === s.id ? <><Loader2 size={12} className="animate-spin" /> Cancelling…</> : "Cancel Registration"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {foundSignups?.length === 0 && !cancelDone && (
                <p className="text-sm text-gray-500 italic text-center py-4">No active workshop registrations found for this email.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
