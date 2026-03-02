import type { Metadata } from "next";
import { NavPanel } from "@/components/navpan/NavPanel";
import "./globals.css";

export const metadata: Metadata = {
  title: "ServerUData",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container_main">
          <div className="NavPan">
            <NavPanel />
          </div>
          <div className="Gallery">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
