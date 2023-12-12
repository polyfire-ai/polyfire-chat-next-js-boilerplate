"use client";

import { PolyfireProvider } from "polyfire-js/hooks";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import "./globals.css";

const PROJECT_NAME = process.env.NEXT_PUBLIC_POLYFIRE_BOTNAME || "Chatbot";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />

      <body className="app-container">
        <PolyfireProvider
          // Need to add the project alias in the .env file
          project={process.env.NEXT_PUBLIC_POLYFIRE_PROJECT || ""}
        >
          <Header
            title={PROJECT_NAME}
            logo="./logo.svg" // to replace with your own logo replace the logo.svg file in the public folder
            bgColor="#0ea5e9"
            textColor="#E2E8F0"
          />
          <div className="content">{children}</div>
          <Footer name={PROJECT_NAME} bgColor="#0ea5e9" textColor="#E2E8F0" />
        </PolyfireProvider>
      </body>
    </html>
  );
}
