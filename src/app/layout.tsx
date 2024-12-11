import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { SidebarWithLists } from "@/components/sidebar-with-lists";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "To Do",
  description:
    "Aplicação de lista de tarefas para gerenciar suas atividades diárias. Adicione, edite e exclua tarefas facilmente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          geistSans.variable,
          geistMono.variable,
          "antialiased bg-zinc-900 text-white p-5 flex h-screen gap-5 overflow-hidden"
        )}
      >
        <SidebarWithLists />
        {children}
      </body>
    </html>
  );
}
