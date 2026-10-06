import type { Metadata,Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bolita Food · Operación diaria",
  description: "Panel de pedidos y operación diaria para Bolita Food.",

  icons: {
    icon: "/bolita-logo-reference.png",
    apple: "/bolita-logo-reference.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fffaf4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className="light">
      <body className="antialiased">{children}</body>
    </html>
  );
}
