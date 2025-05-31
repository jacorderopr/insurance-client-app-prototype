// frontend/app/layout.tsx
import type { Metadata } from "next";

// If your globals.css is empty, you can comment out the next line or leave it.
// If you add styles to globals.css later, uncomment it.
// import "./globals.css";

export const metadata: Metadata = {
  title: "Insurance Client Management",
  description: "Manage insurance clients efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* You can add common layout elements here like a Navbar or Footer later */}
        <main>{children}</main> {/* 'children' will be your page components */}
      </body>
    </html>
  );
}