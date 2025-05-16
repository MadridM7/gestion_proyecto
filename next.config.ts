import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Desactivar el botón flotante de desarrollo
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
