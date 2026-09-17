
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowUp",
  description: "Plataforma omnicanal de comunicaciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="h-full antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

