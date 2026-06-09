export default function AIAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/media/pexels-rdne-8231167.jpg"
      />
      {children}
    </>
  );
}
