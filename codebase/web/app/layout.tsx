import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clarify First — VLearn Tutor",
  description: "Tutor hỏi lại trước khi trả lời câu hỏi mơ hồ.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
