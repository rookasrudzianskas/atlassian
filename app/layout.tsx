import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import ApolloProviderWrapper from "@/components/ApolloProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atlassian",
  description: "Atlassian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviderWrapper>
      <ClerkProvider>
        <html lang="en">
          <body className={'min-h-screen flex '}>
            {children}
          </body>
        </html>
      </ClerkProvider>
    </ApolloProviderWrapper>
  );
}
