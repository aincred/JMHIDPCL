// // app/admin/layout.tsx
// "use client";

// import SideNav from "./_components/sidenav";
// import Header from "./_components/header";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();

//   useEffect(() => {
//     // Simple auth check using localStorage
//     const isAuthenticated = localStorage.getItem("admin_auth");
//     if (!isAuthenticated) {
//       router.push("/admin/login");
//     }
//   }, [router]);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <SideNav />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <main className="p-6 overflow-y-auto bg-gray-50 flex-1">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import SideNav from "./_components/sidenav";
import Header from "./_components/header";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  bg-gray-100">
      {/* Sidebar */}
      <SideNav />

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="mt-16 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <SideNav />
//       <div className="flex flex-col  flex-1">
//         <Header />
//         {children}
//       </div>
//     </div>
//   );
// }

