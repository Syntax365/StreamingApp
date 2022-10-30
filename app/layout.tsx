export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>Testing Root SSR {children}</body>
    </html>
  );
}
