import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админ-панель | ЖелезБетон"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "Inter, system-ui, sans-serif", margin: 0, background: "#f8fafc", color: "#1a1a2e" }}>
        {children}
      </body>
    </html>
  );
}
