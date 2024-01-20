import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { ToastRender } from '@/components/Toast';
import ModalRender from '@/components/Modal';
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
      <Script src="/js/snarkjs.min.js" />
      <body className={inter.className}>
        <Providers>
          <ToastRender />
          <ModalRender />
          {children}
        </Providers>
      </body>
    </html>
  );
}
