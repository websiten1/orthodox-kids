import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calea Luminii — Cateheză Ortodoxă",
  description: "Platformă interactivă de cateheză ortodoxă pentru copii din clasele 1-8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
