import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "./ui/head";
import Category from "./ui/category";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EveryOneDeveloper | EOD",
  description: "개발자와 유저가 서로에게 의뢰하고 아이디어를 나누며 개발자는 팀을 꾸리며 확정된 의뢰에 대해 펀딩을 통해 개발진행을 할 수 있습니다. 유저와 개발자가 함께 만들어 나가는 개발 커뮤니티입니다!",
  metadataBase : new URL("https://eod-nine.vercel.app"),
  keywords:"개발, 개발자, 앱, 커뮤니티, 개발커뮤니티, GPT, 개발팀, 펀딩, 개발펀딩",
  openGraph : {
    type : 'website',
    siteName : 'EOD',
    title : "EveryOneDeveloper",
    url : "https://eod-nine.vercel.app",
    description : "개발자와 유저가 서로에게 의뢰하고 아이디어를 나누며 개발자는 팀을 꾸리며 확정된 의뢰에 대해 펀딩을 통해 개발진행을 할 수 있습니다. 유저와 개발자가 함께 만들어 나가는 개발 커뮤니티입니다!",
    images : "https://eodsbucket.s3.ap-northeast-2.amazonaws.com/images/logo.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <div className="flex w-full">
          <Category />
          <div className="flex w-full justify-around">
          {children}
          </div>
        </div>
        <div className="absolute right-0">
          <Head />
        </div>
        </body>
    </html>
  );
}
