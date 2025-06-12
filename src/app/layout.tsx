import ClientWrapper from './Components/wrappers/useSubdomainCheck';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FlexiCRM',
    description: 'FlexiCRM'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>FlexiCRM</title>
                <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="icon" sizes="16x16" href="/logo/favicon-16x16.png" />
                <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" />
                <link rel="apple-touch-icon" sizes="57x57" href="/logo/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/logo/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/logo/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/logo/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/logo/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/logo/apple-icon-120x120.png" />
                {/* <link rel="apple-touch-icon" sizes="144x144" href="/logo/apple-icon-144x144.png" /> */}
                <link rel="apple-touch-icon" sizes="152x152" href="/logo/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/logo/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/logo/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/logo/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon-16x16.png" />
                <link rel="manifest" href="/logo/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/logo/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff"></meta>
            </head>
            <body>
                <ClientWrapper>{children}</ClientWrapper>
            </body>
        </html>
    );
}
