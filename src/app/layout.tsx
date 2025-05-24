// imports

// providers
import ReduxProvider from "@/providers/reduxProvider";
import AuthProvider from "@/providers/authProvider";
import QueryProvider from "@/providers/queryProvider";

// fonts
import { Poppins } from "next/font/google";

// styles
import "@/styles/globals.css";

// componets
import Header from "@/components/header";
import { Toaster } from "react-hot-toast"

// interfaces
import type { Metadata } from "next";

type props = Readonly<{
  children: React.ReactNode;
}>


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'مدبر',
  description: 'مدبر هو تطبيق لإدارة المصاريف يساعدك على تتبع مصاريفك اليومية والشهرية بكل سهولة وشفافية. من خلال واجهة بسيطة وسهلة الاستخدام، يمكنك تسجيل المصاريف، وضع الميزانيات، وتحليل إنفاقك لتحسين إدارة أموالك وتحقيق أهدافك المالية.',
};

export default function RootLayout({children} : props) {

  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
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
