export const metadata = {
  title: "測你的高敏感角色 | DOES 高敏感人格測驗",
  description: "25 題測出你是哪種高敏感動物角色，看看你的感知輪廓。高敏感人格（HSP）不是病，也不是你想太多。",
  keywords: ["高敏感人格", "HSP", "DOES", "心理測驗", "高敏感", "感知動物", "人格測驗", "高敏感心理測驗"],
  openGraph: {
    title: "測你的高敏感角色 | DOES",
    description: "25 題測出你是哪種高敏感動物角色，看你的感知輪廓。",
    url: "https://www.does-quiz.com",
    siteName: "DOES 高敏感人格測驗",
    images: [
      {
        // url: "/images/cover.webp",
        width: 1200,
        height: 630,
        alt: "DOES 高敏感人格測驗",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "測你的高敏感角色 | DOES",
    description: "25 題測出你是哪種高敏感動物角色，看你的感知輪廓。",
    images: ["/images/cover.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}