export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex justify-center pt-20 w-full h-full">{children}</div>
}
