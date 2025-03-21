
import './globals.css';

export const metadata = {
  title: 'Simple Click Logger',
  description: 'A simple app that logs button clicks to MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
