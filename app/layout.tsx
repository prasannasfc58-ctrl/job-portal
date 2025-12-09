import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { cookies } from "next/headers";
import LayoutClient from "@/components/layout-client";


// export const metadata = { title: "Portal" };

export default async function RootLayout({ children }: any) {
  // Server component: synchronous cookies
  // const cookieStore = await cookies(); // type: ReadonlyRequestCookies
  // const roleCookie = cookieStore.get("role"); // type: Cookie | undefined
  // const role = roleCookie ? (roleCookie.value as "student" | "company") : null;

  return (
    <html lang="en">
      <body className="min-h-screen flex bg-white">
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}

