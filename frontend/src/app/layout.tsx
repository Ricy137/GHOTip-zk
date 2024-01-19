import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/modules/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GHOTip',
  description:
    ' Effortlessly pay tips with the assurance of privacy, safety, and efficiency. Simplify your transactions now!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
