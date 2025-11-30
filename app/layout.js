import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProtoVator | Global Innovation Hub",
  description: "Bridging Digital, Physical, and Entrepreneurial Creation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          <Navbar />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
