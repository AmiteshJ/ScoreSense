import { AppSidebar, MobileNav } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 lg:pl-64 pb-20 lg:pb-0">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}
