"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { notFound } from "next/navigation";

const PACKAGES: Record<string, {
  name: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  emoji: string;
  cardcomUrl: string;
  badge?: string;
}> = {
  digital: {
    emoji: "🎬",
    name: "PARTY TIME SOS",
    subtitle: "הצעד הראשון — מהבית",
    price: "197",
    description: "קורס וידאו מוקלט. תתחיל לשחרר את הגוף — לפני שתגיע למסיבה.",
    features: [
      "5 תנועות ידיים ורגליים שישחררו אותך מיידית",
      "תרגילי שחרור עצמי בבית",
      "הסבר מה קורה לגוף כשהוא מתכווץ ברחבה",
      "כלים ראשונים לריקוד חופשי",
      "גישה לכל החיים",
    ],
    cardcomUrl: "https://secure.cardcom.solutions/EA/EA5/MACstz7RFkqVw86NjcDQg/PaymentSP",
  },
  plus: {
    emoji: "✨",
    name: "PARTY TIME PLUS",
    subtitle: "פגישה אחת + קורס דיגיטלי",
    price: "870",
    description: "מפגש אחד עם יוסף + קורס דיגיטלי מלא.",
    features: [
      "מפגש אחד אחד על אחד עם יוסף",
      "קורס דיגיטלי מלא לכל החיים",
      "תנועות מותאמות אישית לגוף שלך",
      "שחרור גופני וחיבור לביטחון עצמי",
      "בסיס חזק להמשך לבד",
    ],
    cardcomUrl: "https://secure.cardcom.solutions/EA/EA5/lQd4fxNxk6jfWysNjI7w/PaymentSP",
  },
  shihrur: {
    emoji: "🔥",
    name: "PARTY TIME MASTER",
    subtitle: "2 מפגשים אישיים + קורס דיגיטלי",
    price: "1,497",
    description: "2 מפגשים עם יוסף וקורס דיגיטלי שמדמה 5 שיעורים פרטיים.",
    badge: "הנפוץ ביותר",
    features: [
      "2 מפגשים אחד על אחד עם יוסף",
      "קורס דיגיטלי שמדמה 5 שיעורים פרטיים",
      "טרנסים, מזרחית, חתונות ומסיבות טבע",
      "שחרור גופני ועבודה על ביטחון עצמי",
      "גישה לקורס לכל החיים",
    ],
    cardcomUrl: "https://secure.cardcom.solutions/EA/EA5/U36YwhDXm0qyujHP73QRuA/PaymentSP",
  },
  hayetzia: {
    emoji: "⚡",
    name: "PARTY TIME STAR",
    subtitle: "התהליך המלא — הכל כלול",
    price: "3,500",
    description: "4 מפגשים + ליווי 30 יום + קורס דיגיטלי מלא.",
    badge: "הכי מומלץ",
    features: [
      "4 מפגשים אחד על אחד עם יוסף",
      "ליווי צמוד 30 יום בוואטסאפ",
      "איך לזהות מי בעניין ומי לא",
      "איך לגשת אליה גם כשהיא עם חברות",
      "ריקוד משוחרר שמייצר חוויה",
      "קורס דיגיטלי מלא לכל החיים",
    ],
    cardcomUrl: "https://secure.cardcom.solutions/EA/EA5/rFHwiE1JkUKa3C1h5frsgA/PaymentSP",
  },
};

export default function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const pkg = PACKAGES[slug];
  if (!pkg) notFound();

  const [form, setForm] = useState({ name: "", phone: "", email: "", consent: false });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "שדה חובה";
    if (!form.phone.trim()) e.phone = "שדה חובה";
    if (!form.email.trim()) e.email = "שדה חובה";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "כתובת מייל לא תקינה";
    if (!form.consent) e.consent = "יש לאשר את התנאים להמשך";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("loading");

    // שליחה ברקע — לא חוסמת את המעבר לתשלום
    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        packageName: pkg.name,
        price: pkg.price,
      }),
    }).catch(() => {});

    // מעבר לקארדקום תמיד — לא תלוי בהצלחת ה-API
    setStatus("success");
    setTimeout(() => { window.location.href = pkg.cardcomUrl; }, 1200);
  };

  const inputStyle = (field: string) => ({
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${errors[field] ? "#f87171" : "rgba(124,58,237,0.3)"}`,
  });

  return (
    <main className="min-h-screen px-4 py-10 md:py-16" dir="rtl">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 flex items-center justify-between">
        <a
          href="/"
          className="text-sm text-gray-500 hover:text-violet-400 transition-colors"
        >
          ← חזרה לדף הראשי
        </a>
        <span className="text-gray-600 text-xs">🔒 תשלום מאובטח דרך קארדקום</span>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">

        {/* Right — Package details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {pkg.badge && (
            <div
              className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-5 text-white"
              style={{ background: "linear-gradient(90deg, #7c3aed, #ec4899)" }}
            >
              {pkg.badge}
            </div>
          )}

          <div className="text-5xl mb-4">{pkg.emoji}</div>
          <p className="text-violet-400 text-sm font-semibold mb-1">Party Time לגברים</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{pkg.name}</h1>
          <p className="text-gray-400 mb-6">{pkg.subtitle}</p>

          <div className="mb-8">
            <span className="font-black text-5xl text-white">{pkg.price}</span>
            <span className="text-gray-400 text-xl mr-1">₪</span>
          </div>

          <p className="text-gray-400 mb-5 leading-relaxed">{pkg.description}</p>

          <ul className="space-y-3">
            {pkg.features.map((f) => (
              <li key={f} className="flex gap-3 items-start text-gray-300">
                <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Left — Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-3xl p-7 sticky top-8"
          style={{
            background: "rgba(124,58,237,0.06)",
            border: "1px solid rgba(124,58,237,0.25)",
            boxShadow: "0 0 40px rgba(124,58,237,0.1)",
          }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-5">✅</div>
                <h2 className="text-2xl font-bold text-white mb-2">מעבר לתשלום...</h2>
                <p className="text-gray-400">מיד תועבר לדף התשלום המאובטח של קארדקום.</p>
              </motion.div>
            ) : (
              <motion.div key="form">
                <h2 className="text-2xl font-bold text-white mb-1 text-center">כמעט שם!</h2>
                <p className="text-gray-500 text-sm text-center mb-7">
                  מלא פרטים ותועבר לתשלום המאובטח
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">שם מלא *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: "" })); }}
                      placeholder="ישראל ישראלי"
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      style={inputStyle("name")}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">טלפון *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: "" })); }}
                      placeholder="050-0000000"
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      style={inputStyle("phone")}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">אימייל *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: "" })); }}
                      placeholder="email@example.com"
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      style={{ ...inputStyle("email"), direction: "ltr", textAlign: "right" }}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Consent */}
                  <div>
                    <label className="flex gap-3 items-start cursor-pointer">
                      <div className="relative mt-0.5 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => { setForm(p => ({ ...p, consent: e.target.checked })); setErrors(p => ({ ...p, consent: "" })); }}
                          className="sr-only"
                        />
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center transition-colors"
                          style={{
                            background: form.consent ? "#7c3aed" : "transparent",
                            border: `2px solid ${errors.consent ? "#f87171" : form.consent ? "#7c3aed" : "rgba(124,58,237,0.4)"}`,
                          }}
                        >
                          {form.consent && <span className="text-white text-xs font-bold">✓</span>}
                        </div>
                      </div>
                      <span className="text-gray-500 text-xs leading-relaxed">
                        אני מאשר קבלת עדכונים, תכנים ומידע שיווקי מ-
                        <span className="text-gray-300">Passion For Action</span>
                        {" "}בכל ערוץ תקשורת (מייל, SMS, וואטסאפ).
                        ניתן לבטל בכל עת. בהתאם לחוק התקשורת תשמ&quot;ב-1982.
                      </span>
                    </label>
                    {errors.consent && <p className="text-red-400 text-xs mt-1 mr-8">{errors.consent}</p>}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-2xl py-4 font-bold text-lg text-white mt-1 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "loading" ? "שולח..." : `לתשלום מאובטח — ${pkg.price} ₪ ←`}
                  </motion.button>

                  {/* Security */}
                  <div
                    className="flex items-center justify-center gap-4 pt-3"
                    style={{ borderTop: "1px solid rgba(124,58,237,0.15)" }}
                  >
                    <span className="text-gray-700 text-xs">🔒 תשלום מאובטח</span>
                    <span className="text-gray-700 text-xs">|</span>
                    <span className="text-gray-700 text-xs">🛡️ קארדקום</span>
                    <span className="text-gray-700 text-xs">|</span>
                    <span className="text-gray-700 text-xs">✅ SSL</span>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer */}
      <div
        className="max-w-5xl mx-auto mt-16 pt-6 text-center text-gray-700 text-xs"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        © {new Date().getFullYear()} Passion For Action | יוסף אלון · תנועה יוצרת מציאות
      </div>
    </main>
  );
}
