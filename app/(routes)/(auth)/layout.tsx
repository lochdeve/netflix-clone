export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='bg-amber-500'>
      <body>{children}</body>
    </html>
  );
}
