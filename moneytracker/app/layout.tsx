import ThemeRegistry from "./theme/ThemeRegistry";

export const metadata = {
  title: "My Next.js App",
  description: "Next.js + MongoDB + MUI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
