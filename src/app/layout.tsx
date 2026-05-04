import './globals.css';
import './fonts.css';
import { ViewTransitions } from 'next-view-transitions';
import DiscordMetadata from '@/components/DiscordMetadata';
import { SmoothScrollProvider } from '@/context/SmoothScrollProvider';
import TransitionOverlay from '@/components/TransitionOverlay';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className="scrollbar-none medium-font">
        <head>
          <DiscordMetadata />
        </head>
        <SmoothScrollProvider>
          <body className="bg-[#131313] text-white scrollbar-none overflow-y-auto">
            <TransitionOverlay />  {/* ← add this */}
            {children}
          </body>
        </SmoothScrollProvider>
      </html>
    </ViewTransitions>
  );
}
