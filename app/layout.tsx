import ThemeRegistry from "./theme/ThemeRegistry";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Money Tracker</title>
        <meta name="description" content="Next.js + MongoDB + MUI" />
      </head>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
