import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@workspace/ui/components/toaster";
import "@workspace/ui/styles/globals.css";
import QueryProvider from "@/_components/query-provider";

export const metadata = {
  title: "Reviewnow",
  description: "The fastest way to create reviews and beta previewing.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground ">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
