import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática (carpeta out/) para hosting tradicional como cPanel
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
