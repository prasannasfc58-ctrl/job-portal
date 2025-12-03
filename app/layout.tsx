import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { cookies } from "next/headers";

export const metadata = { title: "Portal" };

export default async function RootLayout({ children }: any) {
  // Server component: synchronous cookies
  const cookieStore = await cookies(); // type: ReadonlyRequestCookies
  const roleCookie = cookieStore.get("role"); // type: Cookie | undefined
  const role = roleCookie ? (roleCookie.value as "student" | "company") : null;
  // Get current pathname
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  // Render sidebar only if NOT on login page
  const showSidebar = currentPath !== "/login";
return (
    <html lang="en">
      <body className="min-h-screen flex bg-gray-100">
        {showSidebar && (
          <div className="w-64 block">
            <Sidebar role={role} />
          </div>
        )}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}

