"use client";

import { PolyfireProvider } from "polyfire-js/hooks";
import { Header } from "@/components/Header";

import "./globals.css";

const PROJECT_NAME = process.env.NEXT_PUBLIC_POLYFIRE_BOTNAME || "Chatbot";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />

      <body className="app-container h-screen">
        <PolyfireProvider
          // Need to add the project alias in the .env file
          project={process.env.NEXT_PUBLIC_POLYFIRE_PROJECT || ""}
        >
          <Header
            title={PROJECT_NAME}
            logo="./logo.svg" // to replace with your own logo replace the logo.svg file in the public folder
            bgColor="#1e40af"
            textColor="#E2E8F0"
          />
          <div className="content h-full">{children}</div>
        </PolyfireProvider>
      </body>
    </html>
  );
}
