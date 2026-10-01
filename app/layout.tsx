import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "KRNIVORO Supplements | Catálogo de alto rendimiento", description: "Catálogo KRNIVORO de suplementación deportiva, recuperación y bienestar para atletas y distribuidores en México.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body className="antialiased">{children}</body></html>; }
