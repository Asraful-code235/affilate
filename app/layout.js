"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Footer from "../components/start/Footer";
import Header from "../components/start/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { FilterProvider } from "../context/FilterContext";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        {/* <FilterProvider> */}
        <body className={inter.className}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
        {/* </FilterProvider> */}
      </QueryClientProvider>
    </html>
  );
}
