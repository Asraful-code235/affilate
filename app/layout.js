"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Footer from "../components/start/Footer";
import Header from "../components/start/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <QueryClientProvider client={queryClient}>
          <main>{children}</main>
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  );
}
