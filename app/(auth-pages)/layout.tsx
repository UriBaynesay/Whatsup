import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication",
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-center pt-20 w-full">{children}</div>
  )
}
