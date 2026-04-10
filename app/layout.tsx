import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IM All Stars - JEE Physics Singapore',
  description: 'An exclusive offline cohort in Singapore for Indian students — designed to build concepts from scratch and push you to advanced problem-solving.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}

