import type { Metadata } from "next";
import "./globals.css";
import { getDictionary } from '@/lib/dictionary';

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: {
      template: dict.metadata.titleTemplate,
      default: dict.metadata.defaultTitle,
    },
    description: dict.metadata.description,
    icons: {
      icon: '/logo-white.png', 
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}