import type { Metadata } from 'next';
import { inter } from '@/config/fonts';

import { Providers } from "@/components";

import './globals.css';



export const metadata: Metadata = {
  title: {
    template: '%s - Proyecto final | Shop',
    default:'Home - Proyecto final | Shop'
  },
  description: 'Una tienda virtual de productos',
  icons: {
    icon: '/new-favicon.ico', 
  },
  openGraph: {
    title: 'Proyecto final | Shop',
    description: 'Una tienda virtual de productos',
    //images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyecto final | Shop',
    description: 'Una tienda virtual de productos',
    //images: ['/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> {children} </Providers>
        </body>
    </html>
  )
}
