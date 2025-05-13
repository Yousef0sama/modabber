// imports

// redux
import ReduxProvider from "@/store/reduxProvider";

// fonts
import { Poppins } from "next/font/google";

// styles
import "@/styles/globals.css";

// componets
import Header from "@/components/header";
import Container from "@/components/ui/container";

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
  description: '...',
};

export default function RootLayout({children} : props) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <ReduxProvider>
          <Header />
          <Container>
            {children}
          </Container>
        </ReduxProvider>
      </body>
    </html>
  );
}
