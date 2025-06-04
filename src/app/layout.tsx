// ===================== Imports ===================== //

// Providers
import ReduxProvider from "@/providers/reduxProvider";
import AuthProvider from "@/providers/authProvider";
import QueryProvider from "@/providers/queryProvider";

// Fonts
import { Poppins } from "next/font/google";

// Styles
import "@/styles/globals.css";

// Components
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";

// Interfaces
import type { Metadata } from "next";

// ===================== Font Config ===================== //

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// ===================== Metadata ===================== //

export const metadata: Metadata = {
  title: "مدبر",
  description:
    "مدبر هو تطبيق لإدارة المصاريف يساعدك على تتبع مصاريفك اليومية والشهرية بكل سهولة وشفافية. من خلال واجهة بسيطة وسهلة الاستخدام، يمكنك تسجيل المصاريف، وضع الميزانيات، وتحليل إنفاقك لتحسين إدارة أموالك وتحقيق أهدافك المالية.",
};

// ===================== Layout Component ===================== //

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ReduxProvider>
          <QueryProvider>
            <AuthProvider>
              <Header />
              {children}
              <Toaster position="top-right" />
            </AuthProvider>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
