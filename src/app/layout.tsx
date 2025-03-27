import "./reset.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RecoilRootProvider from "../utils/recoilRootProvider";
import Footer from "@/components/Footer";
import { QueryProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CultPick",
  description: "문화를 쉽게 즐기는 방법, 컬픽",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <QueryProvider>
          <RecoilRootProvider>
            <div
              style={{
                minHeight: "calc(100vh - 10rem)",
              }}
            >
              {children}
            </div>
            <Footer />
          </RecoilRootProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
