import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VLearn Tutor — Hỏi lại khi mơ hồ",
  description: "Bản mô phỏng cải tiến quy trình hỏi lại của Trợ giảng AI trên VLearn.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
