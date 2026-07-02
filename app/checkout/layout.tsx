import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "../globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Party Time לגברים | השלמת רכישה",
  robots: { index: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={assistant.variable}>
      <body style={{ background: "#06060f", color: "#f0f0f0", fontFamily: "var(--font-assistant), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
