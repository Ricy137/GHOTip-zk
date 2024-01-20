import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import GHOIcon from '@/assets/icons/GHOTip.svg';
import { ToastRender } from '@/components/Toast';
import ModalRender from '@/components/Modal';
import Providers from '@/modules/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GHOTip',
  applicationName: 'GHOTip',
  description:
    'Effortlessly pay tips with the assurance of privacy, safety, and efficiency. Simplify your transactions now!',
  icons: GHOIcon,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
        <Script src="/js/snarkjs.min.js" />
      </head>

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
