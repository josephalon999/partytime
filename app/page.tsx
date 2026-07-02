"use client";

import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const WA_NUMBER = "972507562332";

function waLink(track: string) {
  const msg = encodeURIComponent(
    `היי יוסף, אני מעוניין במסלול "${track}" — Party Time לגברים 🕺`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

const COURSE_PREVIEW_ID = "914578337";

const videoTestimonials = [
  { id: "911148534" },
  { id: "903033668" },
  { id: "923164499" },
  { id: "923150829" },
  { id: "923152251" },
  { id: "923150873" },
  { id: "799388963" },
  { id: "836026234" },
  { id: "1050728272", hash: "44b5f4437d" },
  { id: "1039985977" },
  { id: "942788300" },
  { id: "925087288" },
  { id: "1061597853" },
];

const painPoints = [
  "הגעת למסיבה, ראית שכולם על הרחבה — ואתה עמדת בצד",
  "כולם שואלים \"למה אתה לא רוקד?\" ואתה לא יודע מה לענות",
  "הרגשת שצריך כוס בירה כדי \"להיכנס לזה\"",
  "ראית גברים משתחררים ברחבה ושאלת את עצמך: \"איך הם עושים את זה?\"",
  "הפחד להיראות מגוחך חזק יותר מהרצון ליהנות",
  "יצאת מהמסיבה עם תחושה שפספסת משהו — שוב",
];

const tracks = [
  {
    id: "digital",
    emoji: "🎬",
    name: "PARTY TIME SOS",
    subtitle: "הצעד הראשון — מהבית",
    price: "197",
    description: "קורס וידאו מוקלט. תתחיל לשחרר את הגוף — לפני שתגיע למסיבה.",
    features: [
      "5 תנועות ידיים ורגליים שישחררו אותך מיידית — גם אם האירוע עכשיו",
      "תרגילי שחרור עצמי בבית",
      "הסבר מה קורה לגוף כשהוא מתכווץ ברחבה",
      "כלים ראשונים לריקוד חופשי",
      "גישה לכל החיים",
    ],
    cta: "מתחיל מהבית",
    paymentUrl: "https://secure.cardcom.solutions/EA/EA5/MACstz7RFkqVw86NjcDQg/PaymentSP",
    gradient: "from-blue-900/40 to-violet-900/30",
    border: "border-blue-500/20",
    glow: "rgba(59,130,246,0.15)",
    tag: null,
  },
  {
    id: "plus",
    emoji: "✨",
    name: "PARTY TIME PLUS",
    subtitle: "פגישה אחת + קורס דיגיטלי",
    price: "870",
    description: "מפגש אחד עם יוסף + קורס דיגיטלי מלא — השקעה קטנה, שינוי גדול.",
    features: [
      "מפגש אחד אחד על אחד עם יוסף",
      "קורס דיגיטלי מלא לכל החיים",
      "תנועות מותאמות אישית לגוף שלך",
      "שחרור גופני וחיבור לביטחון עצמי",
      "בסיס חזק להמשך לבד",
    ],
    cta: "אני רוצה להתחיל",
    paymentUrl: "https://secure.cardcom.solutions/EA/EA5/lQd4fxNxk6jfWysNjI7w/PaymentSP",
    gradient: "from-teal-900/40 to-cyan-900/30",
    border: "border-teal-500/20",
    glow: "rgba(20,184,166,0.15)",
    tag: null,
  },
  {
    id: "shihrur",
    emoji: "🔥",
    name: "PARTY TIME MASTER",
    subtitle: "2 מפגשים אישיים + קורס דיגיטלי",
    price: "1,497",
    description: "2 מפגשים עם יוסף וקורס דיגיטלי שמדמה 5 שיעורים פרטיים — זמין לכל החיים.",
    features: [
      "2 מפגשים אחד על אחד עם יוסף",
      "קורס דיגיטלי שמדמה 5 שיעורים פרטיים",
      "איך לרקוד מזרחית, טרנסים ומוזיקה של חתונות ומסיבות טבע",
      "שחרור גופני ועבודה על ביטחון עצמי",
      "גישה לקורס לכל החיים",
    ],
    cta: "אני רוצה להשתחרר",
    paymentUrl: "https://secure.cardcom.solutions/EA/EA5/U36YwhDXm0qyujHP73QRuA/PaymentSP",
    gradient: "from-violet-900/40 to-purple-900/30",
    border: "border-violet-500/30",
    glow: "rgba(124,58,237,0.2)",
    tag: "הנפוץ ביותר",
  },
  {
    id: "hayetzia",
    emoji: "⚡",
    name: "PARTY TIME STAR",
    subtitle: "התהליך המלא — הכל כלול",
    price: "3,500",
    description: "4 מפגשים אישיים + ליווי 30 יום + קורס דיגיטלי מלא + איך כובשים את הרחבה.",
    features: [
      "4 מפגשים אחד על אחד עם יוסף",
      "ליווי צמוד 30 יום בוואטסאפ",
      "איך לזהות מי בעניין ומי לא — ברגע",
      "איך לגשת אליה גם כשהיא עם חברות",
      "איך לגרום לה להתחיל איתך",
      "לרקוד בצורה משוחררת שמייצרת חוויה ומשכת תשומת לב",
      "לצאת מהערב עם תחושת ניצחון — ואולי גם מספר",
      "להפסיק לתת לפחד מדחייה לנהל אותך",
      "קורס דיגיטלי מלא: טרנסים, מזרחית, 80's, ישראלית, פופ, סלסה, סלואו ועוד",
    ],
    cta: "אני רוצה גם להכיר",
    paymentUrl: "https://secure.cardcom.solutions/EA/EA5/rFHwiE1JkUKa3C1h5frsgA/PaymentSP",
    gradient: "from-pink-900/40 to-rose-900/30",
    border: "border-pink-500/30",
    glow: "rgba(236,72,153,0.2)",
    tag: "הכי מומלץ",
  },
];

const testimonials = [
  {
    name: "אריאל מ.",
    age: "30",
    city: "תל אביב",
    track: "מסלול השתחרות",
    text: "הייתי בטוח שאני 'בן אדם שלא רוקד'. בכל מסיבה עמדתי עם הכוס, מחייך, ומחכה שייגמר. אחרי שלושה מפגשים עם יוסף — הייתי הראשון על הרחבה. בלי כוס בירה. בלי תירוצים.",
    stars: 5,
  },
  {
    name: "מוטי ק.",
    age: "26",
    city: "ירושלים",
    track: "מסלול השתחרות",
    text: "הבושה הייתה גדולה מהרצון. פחדתי שיצחקו עלי. יוסף לא לימד אותי צעדים — הוא הראה לי איך הגוף שלי יכול לנוע בנוח. כבר לא אותו בן אדם ברחבה.",
    stars: 5,
  },
  {
    name: "רן ב.",
    age: "35",
    city: "חיפה",
    track: "מסלול היציאה",
    text: "תמיד הייתי זה שבצד. לא בגלל שלא רציתי — בגלל שלא ידעתי איך להיכנס. יוסף נתן לי את הכלים. הרחבה הפכה מאיום למקום שאני רוצה להיות בו.",
    stars: 5,
  },
  {
    name: "אייל ש.",
    age: "32",
    city: "רמת גן",
    track: "מסלול היציאה",
    text: "לא שתיתי טיפה וניהלתי את כל הרחבה. לא האמנתי שזה אפשרי בשבילי. התהליך שינה את כל מה שחשבתי שאני יכול לעשות עם הגוף שלי.",
    stars: 5,
  },
];

const faqs = [
  {
    q: "אני לא יודע לרקוד בכלל — זה בסדר?",
    a: "זה בדיוק בשבילך. לא מלמדים כאן צעדים. עובדים על שחרור הגוף, ביטחון ונוכחות. לא נדרש ניסיון קודם.",
  },
  {
    q: "כמה זמן לוקח לראות שינוי?",
    a: "מפגש 1 — שחרור, קלילות וחיבור לעצמך. מפגש 2 — כבר יש לך ביטחון לעלות לרחבה, להשתחרר ולדעת מה אתה עושה. מפגשים 3–4 — את כל הטכניקות כדי לתקשר ברחבה, גם עם אנשים אחרים, ולהמיס את הפחד מ'מה יחשבו'. התוצאות מהירות כי יוסף מתאים אישית לך את התנועות שמחמיאות לך.",
  },
  {
    q: "אני לא שותה אלכוהול — האם זה אפשרי?",
    a: "לא רק אפשרי — זה בדיוק מה שהשיטה שלנו בנויה עליו. לא צריך שום כוס כדי להרגיש בנוח ברחבה. הגוף שלך יכול להשתחרר לגמרי בלי אלכוהול. גברים שמגיעים אלינו מגלים שהם מסתדרים הרבה יותר טוב — ומרגישים הרבה יותר אמיתיים — כשהם שם עם ראש צלול.",
  },
  {
    q: "האם אדע איך לפנות לאישה ברחבה?",
    a: "כן — זה בדיוק מה שמסלול PARTY TIME STAR בנוי עליו. תלמד לזהות מי בעניין ומי לא, איך לגשת אליה גם כשהיא עם חברות, איך לגרום לה להתחיל איתך, לרקוד בצורה משוחררת שמייצרת חוויה — ולצאת מהערב עם המספר בטבעיות. בנוסף: איך להפסיק לתת לפחד מדחייה לנהל אותך.",
  },
  {
    q: "יש קבוצות או זה רק אחד על אחד?",
    a: "zoom",
  },
  {
    q: "מה קורה אחרי שמשלמים?",
    a: "יוסף או מישהו מהצוות יוצרים איתך קשר בהקדם לתיאום השיעורים — בתל אביב (ליד עזריאלי), באשדוד, או בZoom לפי מה שנוח לך.",
  },
  {
    q: "מה אם לא ארגיש שזה בשבילי?",
    a: "במפגשים הפרונטליים — מעולם לא קרה שמישהו ביקש לבטל אחרי המפגש הראשון. אבל אם תרצה להפסיק, שאר הכסף חוזר אליך במלואו, מינוס 500 ₪ עבור המפגש הראשון שכבר התקיים.",
  },
];

const methodSteps = [
  {
    icon: "🌊",
    title: "מתאים לך אישית",
    desc: "לא צעדים גנריים. מטפל תנועתי שמזהה מה מחמיא לגוף שלך — ובונה איתך משם.",
  },
  {
    icon: "💪",
    title: "ביטחון מתוך הגוף",
    desc: "ביטחון אמיתי לא בא מהראש. בא ממה שהגוף שלך מרגיש כשהוא משוחרר.",
  },
  {
    icon: "✨",
    title: "נוכחות שמושכת",
    desc: "כשהגוף שלך חי — אתה שולח תדר אחר. לפני שאמרת מילה.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
  y = 40,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: stars }).map((_, i) => (
        <span key={i} className="text-amber-400 text-lg">★</span>
      ))}
    </div>
  );
}

function FloatingOrb({
  x,
  y,
  size,
  color,
  delay,
}: {
  x: string;
  y: string;
  size: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(60px)" }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function SectionHeader({
  tag,
  title,
  sub,
}: {
  tag?: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <FadeIn className="text-center mb-14">
      {tag && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-medium mb-4">
          {tag}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{title}</h2>
      {sub && <p className="text-gray-400 text-xl max-w-2xl mx-auto">{sub}</p>}
    </FadeIn>
  );
}

function VimeoCard({ id, hash, large = false }: { id: string; hash?: string; large?: boolean }) {
  const hashParam = hash ? `&h=${hash}` : "";
  const src = `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1${hashParam}&title=0&byline=0&portrait=0&badge=0&color=7c3aed`;
  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0d0a1e] ${large ? "shadow-2xl" : ""}`}
      style={large ? { boxShadow: "0 0 60px rgba(124,58,237,0.2)" } : {}}
    >
      <div className="aspect-video relative">
        <iframe
          src={src}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

function YouTubeCard({ id, short = false, label }: { id: string; short?: boolean; label?: string }) {
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0d0a1e]"
      style={{ boxShadow: "0 0 30px rgba(236,72,153,0.08)" }}
    >
      {label && (
        <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-pink-500/90 text-white text-xs font-bold">
          {label}
        </div>
      )}
      <div className={short ? "aspect-[9/16]" : "aspect-video"}>
        <iframe
          src={src}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

function ConsultPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-3xl p-7 text-right"
        style={{
          background: "linear-gradient(135deg, #0f0a2e, #1a0b3d)",
          border: "1px solid rgba(124,58,237,0.3)",
          boxShadow: "0 0 60px rgba(124,58,237,0.2)",
        }}
      >
        <button onClick={onClose} className="absolute top-4 left-4 text-gray-500 hover:text-white text-xl">✕</button>
        <p className="text-violet-400 text-sm font-semibold mb-2">ייעוץ חינם</p>
        <h3 className="text-2xl font-bold mb-2">לא בטוח איזה מסלול בשבילך?</h3>
        <p className="text-gray-400 text-base mb-6 leading-relaxed">
          כתוב ליוסף — הוא יבין איפה אתה עכשיו ויגיד לך בדיוק מה מתאים לך. בלי לחץ.
        </p>
        <div className="space-y-3">
          {[
            { name: "PARTY TIME SOS", price: "197₪", emoji: "🎬", desc: "הצעד הראשון מהבית" },
            { name: "PARTY TIME MASTER", price: "1,497₪", emoji: "🔥", desc: "2 מפגשים + קורס דיגיטלי" },
            { name: "PARTY TIME STAR", price: "3,500₪", emoji: "⚡", desc: "התהליך המלא — הכל כלול" },
          ].map((t) => (
            <div key={t.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
              <span className="text-2xl">{t.emoji}</span>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.desc}</p>
              </div>
              <span className="text-violet-300 font-bold text-sm">{t.price}</span>
            </div>
          ))}
        </div>
        <a
          href={`https://wa.me/972507562332?text=${encodeURIComponent("היי יוסף, אני רוצה לדעת איזה מסלול Party Time מתאים לי 🕺")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block text-center py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-105"
          style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
        >
          💬 שלח הודעה ליוסף בוואטסאפ
        </a>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeT, setActiveT] = useState(0);
  const [showConsult, setShowConsult] = useState(false);

  const nextT = useCallback(() => setActiveT((p) => (p + 1) % testimonials.length), []);
  const prevT = useCallback(
    () => setActiveT((p) => (p - 1 + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    const id = setInterval(nextT, 5500);
    return () => clearInterval(id);
  }, [nextT]);

  return (
    <main className="min-h-screen bg-[#06060f] text-white overflow-x-hidden" dir="rtl">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Hero background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/mandance.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,6,15,0.75) 0%, rgba(6,6,15,0.6) 40%, rgba(6,6,15,0.92) 100%)" }} />
        </div>

        {/* Background orbs */}
        <FloatingOrb x="10%" y="20%" size="400px" color="rgba(124,58,237,0.12)" delay={0} />
        <FloatingOrb x="60%" y="50%" size="300px" color="rgba(236,72,153,0.1)" delay={2} />
        <FloatingOrb x="30%" y="70%" size="250px" color="rgba(59,130,246,0.08)" delay={4} />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-10"
          >
            <span>🕺</span>
            <span>Party Time — לגברים שרוצים להשתחרר</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-8"
          >
            <span className="block text-white">אתה לא עומד בצד</span>
            <span className="block text-white">כי אתה ביישן.</span>
            <span
              className="block mt-3"
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              פשוט אף אחד
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #60a5fa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              לא לימד אותך להשתחרר.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed max-w-xl mx-auto"
          >
            גם אם אין לך קורדינציה.
            <br />
            גם אם מעולם לא רקדת.
            <br />
            גם אם שתית עד עכשיו רק כדי להרגיש בנוח שם.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            <a
              href="#tracks"
              className="px-9 py-4 rounded-full font-bold text-xl text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                boxShadow: "0 0 30px rgba(124,58,237,0.35)",
              }}
            >
              🔥 אני רוצה להשתחרר
            </a>
            <a
              href="#tracks"
              className="px-9 py-4 rounded-full font-semibold text-xl text-white border border-violet-500/40 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300"
            >
              ✨ אני רוצה להרגיש חלק
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex items-center justify-center gap-6 text-gray-600 text-sm flex-wrap"
          >
            <span>✦ 14+ שנות ניסיון</span>
            <span>✦ מאות גברים עברו את התהליך</span>
            <span>✦ שיטת "תנועה יוצרת מציאות"</span>
          </motion.div>
        </div>

        {/* Scroll arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-700 text-2xl"
        >
          ↓
        </motion.div>
      </section>

      {/* ── METHOD VIDEO ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060f] via-violet-950/10 to-[#06060f]" />
        <div className="relative max-w-4xl mx-auto">
          <FadeIn className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-medium mb-4">
              לפני שאתה מחליט — תראה איך זה עובד
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              השיטה והתהליך —
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                בהסבר של יוסף
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <VimeoCard id="915204254" large />
          </FadeIn>
        </div>
      </section>

      {/* ── YOSEF INTRO TEXT ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060f] via-violet-950/10 to-[#06060f]" />
        <div className="relative max-w-2xl mx-auto">
          <FadeIn className="text-right">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-medium mb-5">
              תראה בעצמך
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-snug">
              זה לא על ריקוד.
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                זה על להרגיש חלק.
              </span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed mb-6">
              יוסף לא מלמד צעדים.
              <br />
              הוא מחזיר לגברים את הגוף שלהם — ואיתו את הביטחון, הנוכחות, והאנרגיה שמושכת.
            </p>
            <a
              href="#tracks"
              className="inline-block px-7 py-3.5 rounded-full font-bold text-white transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
            >
              אני רוצה את זה →
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── PAIN SECTION ──────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            tag="מכיר את הסיפור הזה?"
            title={
              <>
                כי אנחנו שמענו אותו
                <span
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {" "}מאות פעמים.
                </span>
              </>
            }
            sub="זה לא בגלל שאתה בעייתי. זה בגלל שאף אחד לא לימד אותך איך הגוף שלך יכול להשתחרר."
          />
          <div className="space-y-3">
            {painPoints.map((point, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-pink-500/20 transition-all duration-300 group">
                  <span className="text-pink-500 text-xl flex-shrink-0 group-hover:scale-110 transition-transform">✗</span>
                  <p className="text-gray-300 text-lg">{point}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ───────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm font-medium mb-4">
              רגע לפני שאתה חושב "זה לא בשבילי"
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              עבדתי עם הגברים
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #ec4899, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                הביישנים ביותר שיש.
              </span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { icon: "🚫", text: "מעולם לא רקדו בחיים" },
              { icon: "🚫", text: "חסרי קורדינציה לחלוטין" },
              { icon: "🚫", text: "שתו כדי לעמוד ברחבה" },
              { icon: "🚫", text: "רקדו — אבל מעולם לא הרגישו משוחררים" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <p className="text-gray-300 text-lg">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div
              className="p-8 rounded-3xl text-center"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08))",
                border: "1px solid rgba(124,58,237,0.25)",
              }}
            >
              <p className="text-white text-2xl font-bold mb-4">כולם יצאו אחרת.</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                כי לא מלמד צעדים.
                <br />
                <span className="text-white font-semibold">מטפל תנועתי</span> שמתאים לך אישית
                את התנועות שמחמיאות לגוף שלך.
                <br />
                ועוזר לך להשתחרר ממקום אמיתי — לא טכני.
              </p>
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm font-semibold"
                style={{
                  background: "rgba(236,72,153,0.12)",
                  border: "1px solid rgba(236,72,153,0.25)",
                  color: "#f9a8d4",
                }}
              >
                <span>✨</span>
                <span>ועוד משהו שגברים לא מצפים לו — הם מפסיקים להיות תלויים באלכוהול כדי להרגיש בנוח ברחבה.</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── WHY SECTION ───────────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/15 to-transparent" />
        <div className="relative max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="text-6xl block mb-6">🧠</span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              זה לא שאתה ביישן.
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                הגוף שלך פשוט לא קיבל רשות ליהנות.
              </span>
            </h2>
          </FadeIn>

          <div className="space-y-5 text-right">
            {[
              "כשגדלים, הגוף לומד להתכווץ. להסתכל מהצד. להיות שקוף.",
              "אף אחד לא לימד אותך לרקוד — אז הגוף למד לא לנסות. בדיוק ברגעים האלה, כשכולם על הרחבה ואתה לא.",
              "ואז אתה מגיע למסיבה, רוצה ליהנות — והגוף פשוט לא מגיב. אולי שותה כוס כדי שיהיה יותר קל. אולי עומד בצד.",
            ].map((text, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <p className="text-gray-300 text-xl leading-relaxed">{text}</p>
              </FadeIn>
            ))}
            <FadeIn delay={0.5}>
              <p className="text-white font-bold text-2xl pt-4 pb-2">
                הבשורה: הגוף לא שבור. הוא רק לא הוזמן.
              </p>
              <p className="text-gray-300 text-xl leading-relaxed">
                ואפשר לשנות את זה — לא דרך טריקים אלא דרך תנועה. דרך חוויה. דרך גוף שחוזר לעצמו.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── DIFFERENCE VIDEO ──────────────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              ההבדל בין גבר{" "}
              <span style={{ background: "linear-gradient(90deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                משוחרר
              </span>{" "}
              לגבר קפוא
            </h2>
            <p className="text-gray-500 text-base mt-2">דקה וחצי שיכולות לשנות לך את הערב</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <YouTubeCard id="MRmz2f239fE" short />
          </FadeIn>
        </div>
      </section>

      {/* ── METHOD SECTION ────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            tag="מטפל תנועתי | 14 שנות ניסיון"
            title={
              <>
                לא מלמד צעדים.
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  מחבר אותך לגוף שלך.
                </span>
              </>
            }
            sub="תנועות שמחמיאות לך. שחרור שבא מבפנים. שינוי שנשאר."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {methodSteps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="p-7 rounded-3xl bg-white/[0.025] border border-white/[0.06] text-right hover:border-violet-500/30 transition-all duration-300 h-full">
                  <div className="text-5xl mb-5">{step.icon}</div>
                  <div className="text-xs text-violet-400 font-semibold tracking-widest uppercase mb-2">
                    שלב {i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── YOSEF SECTION ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Photo */}
            <FadeIn>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2))",
                    filter: "blur(40px)",
                    transform: "scale(0.9)",
                  }}
                />
                <div className="relative rounded-3xl overflow-hidden border border-violet-500/20">
                  <Image
                    src="/images/joseph.jpg"
                    alt="יוסף אלון"
                    width={500}
                    height={620}
                    className="w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06060f]/60 to-transparent" />
                </div>
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn delay={0.2} className="space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm">
                14+ שנות ניסיון
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">יוסף אלון</h2>
              <p className="text-gray-400 text-xl leading-relaxed">
                מייסד Passion For Action ויוצר שיטת{" "}
                <span className="text-white font-semibold">"תנועה יוצרת מציאות"</span>.
              </p>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  לא מלמד צעדי ריקוד. מחבר בין תנועה, שפת גוף, ביטחון עצמי וזוגיות.
                </p>
                <p>
                  מאות גברים עברו איתו תהליך שהחזיר להם את הגוף — ואיתו את הביטחון, הנוכחות, והחיים.
                </p>
                <p>
                  גבר שלא עבר דייט ראשון — תוך שבוע וחצי הגיע לדייט מוצלח.
                  תלמידים שהגיעו עם פחד לרקוד — בתוך כמה מפגשים הרגישו חופשיים.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { num: "14+", label: "שנות ניסיון" },
                  { num: "500+", label: "לקוחות" },
                  { num: "100%", label: "שינוי גופני" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]"
                  >
                    <div
                      className="text-2xl font-bold"
                      style={{
                        background: "linear-gradient(90deg, #a855f7, #ec4899)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {stat.num}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CHANNEL 12 ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-10">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-semibold mb-5">
              <span>📺</span>
              <span>כפי שנראה בתוכנית הבוקר של ערוץ 12 עם פאולה וליאון</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              כשערוץ 12 רוצים להסביר
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                מה זה לרקוד מהגוף — הם קוראים ליוסף.
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 0 60px rgba(251,191,36,0.15), 0 30px 60px rgba(0,0,0,0.5)" }}
            >
              <div className="aspect-video relative">
                <iframe
                  src="https://www.youtube.com/embed/7EvPgvnjohM?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MEDIA APPEARANCES ─────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-8">
            <p className="text-gray-500 text-sm font-semibold tracking-widest uppercase mb-3">כפי שנראה ב</p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600 text-sm font-bold mb-8">
              <span className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">רשת 13</span>
              <span className="text-white/20">·</span>
              <span className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">ערוץ 14</span>
              <span className="text-white/20">·</span>
              <span className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">קשת 12</span>
              <span className="text-white/20">·</span>
              <span className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">102FM</span>
              <span className="text-white/20">·</span>
              <span className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">רדיו תל אביב</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div
              className="relative rounded-3xl overflow-hidden border border-white/[0.07]"
              style={{ boxShadow: "0 0 50px rgba(124,58,237,0.1)" }}
            >
              <Image
                src="/images/tv.jpg"
                alt="יוסף אלון בתוכניות הטלוויזיה — רשת, ערוץ 14, קשת, 102FM"
                width={1200}
                height={700}
                className="w-full h-56 md:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06060f]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 right-8 text-right">
                <p className="text-white font-bold text-lg md:text-xl">
                  כשרוצים להסביר איך גבר משתחרר ברחבה —
                </p>
                <p className="text-violet-300 font-semibold text-base mt-1">מזמינים את יוסף.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── COURSE PREVIEW ────────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <SectionHeader
            tag="הצצה לפנים"
            title={
              <>
                מה תמצא ב-
                <span
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  PARTY TIME MASTER
                </span>
              </>
            }
            sub="הצצה למה שקורה בקורס — לפני שאתה מחליט"
          />
          <FadeIn>
            <VimeoCard id={COURSE_PREVIEW_ID} large />
          </FadeIn>
        </div>
      </section>

      {/* ── TRACKS ────────────────────────────────────────────────────────── */}
      <section id="tracks" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="המסלולים"
            title={
              <>
                בחר איפה אתה עכשיו —
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ולאן אתה רוצה להגיע.
                </span>
              </>
            }
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {tracks.map((track, i) => (
              <FadeIn key={track.id} delay={i * 0.1} className="h-full">
                <div
                  className={`relative flex flex-col h-full p-6 rounded-3xl bg-gradient-to-b ${track.gradient} border ${track.border} transition-all duration-300 hover:scale-[1.02]`}
                  style={{
                    boxShadow: `0 0 40px ${track.glow}`,
                  }}
                >
                  {track.tag && (
                    <div
                      className="absolute -top-3.5 right-6 px-4 py-1.5 rounded-full text-sm font-bold text-white"
                      style={{
                        background: "linear-gradient(90deg, #7c3aed, #ec4899)",
                      }}
                    >
                      {track.tag}
                    </div>
                  )}

                  <div className="text-4xl mb-3">{track.emoji}</div>
                  <div className="text-sm text-gray-400 mb-1">{track.subtitle}</div>
                  <h3 className="text-xl font-bold mb-2">{track.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{track.description}</p>

                  <div className="text-3xl font-extrabold mb-5 text-white">
                    ₪{track.price}
                  </div>

                  <ul className="space-y-2.5 flex-1 mb-6">
                    {track.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-gray-300 text-sm">
                        <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={track.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-3.5 px-5 rounded-2xl font-bold text-base text-white transition-all duration-300 hover:scale-105 hover:shadow-xl mb-3"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                    }}
                  >
                    {track.cta} →
                  </a>
                  <a
                    href={waLink(track.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 text-sm text-gray-500 hover:text-green-400 transition-colors"
                  >
                    💬 שאלה? כתוב בוואטסאפ
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-14">
            <div className="relative rounded-3xl overflow-hidden border border-pink-500/20" style={{ boxShadow: "0 0 50px rgba(236,72,153,0.12)" }}>
              <Image
                src="/images/dancingwithgirl.png"
                alt="גבר רוקד בחופשיות במסיבה"
                width={1200}
                height={480}
                className="w-full h-64 md:h-80 object-cover object-center"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(6,6,15,0.85) 0%, rgba(6,6,15,0.5) 50%, rgba(6,6,15,0.2) 100%)" }} />
              <div className="absolute inset-0 flex items-center justify-end px-10">
                <div className="text-right max-w-sm">
                  <p className="text-white font-extrabold text-2xl md:text-3xl leading-tight mb-3">
                    זה לא חלום.
                    <br />
                    זו התוצאה שמחכה לך.
                  </p>
                  <p className="text-gray-300 text-base">הרחבה שהיית בה בצד — תהפוך למקום שאתה הכי עצמך בו.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="text-center mt-10">
            <p className="text-gray-600 text-sm">
              לא בטוח איזה מסלול מתאים לך?{" "}
              <a
                href={waLink("ייעוץ — לא יודע איזה מסלול")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 underline hover:text-violet-300"
              >
                כתוב ליוסף בוואטסאפ — הוא יעזור לך לבחור.
              </a>
            </p>
          </FadeIn>

          {/* What happens after */}
          <FadeIn delay={0.5} className="mt-14">
            <div
              className="rounded-3xl p-8 text-right"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(236,72,153,0.06))",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              <p className="text-violet-400 text-sm font-semibold mb-3">אחרי שבחרת מסלול</p>
              <h3 className="text-2xl font-bold mb-6">מה קורה עכשיו?</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { step: "1", icon: "✅", title: "בוחר ומשלם", desc: "בוחר את המסלול שמתאים לך ומשלים את התשלום." },
                  { step: "2", icon: "📲", title: "יוסף מתקשר", desc: "יוסף או מישהו מהצוות יוצר איתך קשר בהקדם." },
                  { step: "3", icon: "📍", title: "קובעים מפגש", desc: "מתאמים שיעור — בתל אביב ליד עזריאלי, באשדוד, או בZoom." },
                ].map(({ step, icon, title, desc }) => (
                  <div key={step} className="flex gap-4 items-start">
                    <div
                      className="flex-none w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
                    >
                      {step}
                    </div>
                    <div>
                      <p className="font-bold text-white mb-1">{icon} {title}</p>
                      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ZOOM PROCESS VIDEO ───────────────────────────────────────────── */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <FadeIn className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-medium mb-4">
              רוצה לראות איך זה עובד?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              תהליך שלם —{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                כפי שקורה בזום
              </span>
            </h2>
            <p className="text-gray-400 text-lg mt-3">
              מה שקורה במפגש — לפני שאתה מחליט
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <VimeoCard id="918813109" large />
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/10 to-transparent" />
        <div className="relative max-w-5xl mx-auto">
          <SectionHeader
            tag="עדויות"
            title={
              <>
                מה אומרים הגברים
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #ec4899, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  שעברו את זה.
                </span>
              </>
            }
            sub="לא עדויות מומצאות. סיפורים אמיתיים."
          />

          {/* Featured testimonial */}
          <FadeIn className="mb-10">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeT}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.45 }}
                  className="p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08]"
                >
                  <StarRating stars={testimonials[activeT].stars} />
                  <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mt-6 mb-8 text-right">
                    &ldquo;{testimonials[activeT].text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
                    >
                      {testimonials[activeT].name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonials[activeT].name}</div>
                      <div className="text-gray-500 text-sm">
                        {testimonials[activeT].age}, {testimonials[activeT].city} ·{" "}
                        {testimonials[activeT].track}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Nav */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <button
                  onClick={prevT}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10 transition-colors flex items-center justify-center text-gray-400"
                >
                  →
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveT(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeT ? 28 : 8,
                        height: 8,
                        background:
                          i === activeT
                            ? "linear-gradient(90deg, #7c3aed, #ec4899)"
                            : "rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={nextT}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10 transition-colors flex items-center justify-center text-gray-400"
                >
                  ←
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Grid of all testimonials */}
          <div className="grid sm:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-right cursor-pointer hover:border-violet-500/20 transition-colors"
                  onClick={() => setActiveT(i)}
                >
                  <StarRating stars={t.stars} />
                  <p className="text-gray-300 text-sm leading-relaxed my-3">
                    &ldquo;{t.text.substring(0, 140)}...&rdquo;
                  </p>
                  <div className="text-gray-500 text-xs">
                    {t.name}, {t.age} · {t.track}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED VIMEO VIDEO ──────────────────────────────────────────── */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <VimeoCard id="1046935995" hash="9a037b84c6" large />
          </FadeIn>
        </div>
      </section>

      {/* ── FEATURED VIDEO TESTIMONIALS ───────────────────────────────────── */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-6">
            <YouTubeCard id="CmmOYJLeYnI" label="עדות" />
            <p className="text-center text-gray-400 text-sm mt-3 font-medium">
              "מעולם לא הצלחתי לרקוד — עד שרקדתי 6 שעות ברצף"
            </p>
          </FadeIn>
          <div className="grid grid-cols-3 gap-4 items-start">
            {[
              { id: "zKyxFwfzt0c" },
              { id: "MOgEm5z2Poo" },
              { id: "tg-TqFbEXKM" },
            ].map(({ id }, i) => (
              <FadeIn key={id} delay={i * 0.1}>
                <YouTubeCard id={id} short label="עדות" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO TESTIMONIALS ────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="עדויות וידאו"
            title={
              <>
                שמע מהם
                <span
                  style={{
                    background: "linear-gradient(90deg, #ec4899, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {" "}ישירות.
                </span>
              </>
            }
            sub="לחץ על כל סרטון כדי לצפות"
          />
          <FadeIn>
            <div
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {videoTestimonials.map(({ id, hash }) => (
                <div
                  key={id}
                  className="flex-none w-[75vw] sm:w-[45vw] md:w-[280px] snap-start"
                >
                  <VimeoCard id={id} hash={hash} />
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 text-xs mt-3">← גלול לצפייה בעוד עדויות</p>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            tag="שאלות נפוצות"
            title="כל מה שרצית לשאול"
            sub="בלי עיגולים. תשובות ישרות."
          />

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-right hover:bg-white/[0.03] transition-colors"
                  >
                    <span className="font-semibold text-lg text-white leading-snug">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-violet-400 flex-shrink-0 mr-4 text-sm"
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-right border-t border-white/[0.04] pt-4">
                          {faq.a === "zoom" ? (
                            <div className="space-y-4">
                              <p className="text-gray-400 text-lg leading-relaxed">
                                המפגשים אחד על אחד הם כדי לעבור תהליך איכותי ומדויק בשבילך.
                              </p>
                              <p className="text-gray-400 text-lg leading-relaxed">
                                אפשרי גם להצטרף למפגשים קבוצתיים בזום.
                              </p>
                              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <a
                                  href={waLink("מפגשי זום קבוצתיים")}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-5 py-3 rounded-xl text-white text-sm font-bold text-center transition-all duration-300 hover:scale-105"
                                  style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
                                >
                                  💬 שלח הודעה ליוסף
                                </a>
                                <a
                                  href="https://passion4action.ravpage.co.il/love%20-%20esti"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-5 py-3 rounded-xl border border-violet-500/40 text-violet-300 text-sm font-bold text-center hover:bg-violet-500/10 transition-all duration-300"
                                >
                                  📅 הרשם למפגשי זום →
                                </a>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-400 text-lg leading-relaxed">{faq.a}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-36 px-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/man2dance.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-20"
          />
          <FloatingOrb x="20%" y="30%" size="500px" color="rgba(124,58,237,0.1)" delay={0} />
          <FloatingOrb x="60%" y="60%" size="350px" color="rgba(236,72,153,0.08)" delay={3} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06060f]/60 via-[#06060f]/40 to-[#06060f]" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="text-7xl block mb-8">🎆</span>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              הגיע הזמן שתהיה
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                מישהו שחי ברחבה.
              </span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-xl mx-auto">
              לא עוד מסיבה שתעמוד בה בצד.
              <br />
              לא עוד ערב שתצא ממנו עם תחושה שפספסת.
              <br />
              <span className="text-white font-semibold">
                הגיע הזמן שתרגיש את הגוף שלך שוב.
              </span>
            </p>

            <a
              href="#tracks"
              className="inline-block px-12 py-5 rounded-full font-bold text-2xl text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                boxShadow: "0 0 50px rgba(124,58,237,0.4)",
              }}
            >
              🔥 אני רוצה להשתחרר
            </a>

            <p className="mt-8 text-gray-600 text-sm">
              שאלות?{" "}
              <a
                href={waLink("שאלה כללית")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 underline hover:text-violet-300"
              >
                כתוב ליוסף ישירות בוואטסאפ
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
          <div>
            <p className="font-semibold text-gray-400">Passion For Action | יוסף אלון</p>
            <p className="mt-1">תנועה יוצרת מציאות</p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/josephalon.pfa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-400 transition-colors"
            >
              פייסבוק
            </a>
            <a
              href="https://www.instagram.com/josephalon_love/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-400 transition-colors"
            >
              אינסטגרם
            </a>
            <a
              href="https://www.tiktok.com/@josephalon.pfa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-400 transition-colors"
            >
              טיקטוק
            </a>
          </div>
          <p>© {new Date().getFullYear()} כל הזכויות שמורות</p>
        </div>
        <div className="max-w-4xl mx-auto mt-6 pt-6 border-t border-white/[0.03] flex justify-center gap-6 text-gray-700 text-xs">
          <a
            href="https://passion4action.ravpage.co.il/%20pratiut"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500 transition-colors"
          >
            מדיניות פרטיות
          </a>
          <span>·</span>
          <a
            href="https://passion4action.ravpage.co.il/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500 transition-colors"
          >
            תנאי שימוש
          </a>
        </div>
      </footer>

      {/* ── FLOATING CONSULT BUTTON ───────────────────────────────────────── */}
      <motion.button
        onClick={() => setShowConsult(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full font-bold text-white shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #ec4899)",
          boxShadow: "0 0 30px rgba(124,58,237,0.5)",
        }}
      >
        🤔 <span className="text-sm">איזה מסלול בשבילי?</span>
      </motion.button>

      {/* ── CONSULT POPUP ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showConsult && <ConsultPopup onClose={() => setShowConsult(false)} />}
      </AnimatePresence>
    </main>
  );
}
