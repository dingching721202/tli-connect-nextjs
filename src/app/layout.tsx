import type { Metadata } from "next";
import "../index.css";
import "../App.css";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: "TLI Connect Booking - 課程預約系統",
  description: "TLI Connect Booking System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="zh-TW">
        <body>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
            </div>

            {/* Navigation will be conditionally rendered inside children based on auth status */}
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
