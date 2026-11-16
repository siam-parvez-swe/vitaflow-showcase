import "./globals.css";

export const metadata = {
  title: "VitaFlow — Every Drop Brings Hope",
  description:
    "A blood donation and funding platform connecting donors, recipients, and volunteers.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
