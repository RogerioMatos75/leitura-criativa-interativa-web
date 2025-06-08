import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '../context/AuthContext';

export const metadata: Metadata = {
  title: 'Leitura Criativa Interativa',
  description: 'Plataforma de leitura interativa para crianças.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        {/* Headers will be added dynamically based on the page layout */}
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <AuthProvider>
          {/* Main content of the application */}
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
