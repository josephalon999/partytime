import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Party Time לגברים | יוסף אלון — Passion For Action",
  description:
    "המסלול לגברים ביישנים שרוצים להשתחרר ברחבת הריקודים ובמסיבות — בלי אלכוהול, בלי לעמוד בצד. יוסף אלון, 14 שנות ניסיון, שיטת 'תנועה יוצרת מציאות'.",
  openGraph: {
    title: "Party Time לגברים | יוסף אלון",
    description: "לא עוד מסיבה שתעמוד בה בצד. הגיע הזמן שאתה תהיה מישהו שחי ברחבה.",
    locale: "he_IL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.variable} antialiased font-sans`}>{children}</body>
    </html>
  );
}
