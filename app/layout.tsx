import "./globals.css"

export const metadata = {
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-background text-foreground h-dvh m-0 p-0 box-border">
        {children}
      </body>
    </html>
  )
}
