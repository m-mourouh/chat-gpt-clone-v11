import "./globals.css";
import { Inter} from "next/font/google";

export const metadata = {
  title: "ChatGPT",
  description: "ChatGPT clone built by Mohamed Mourouh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
