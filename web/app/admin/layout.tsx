import { DynamicBreadcrumb } from "@/components/admin/Breadcrumb";
import AdminNavbar from "@/components/admin/Navbar";
import AdminSider from "@/components/admin/Sider";
import AuthRouterComponent from "@/components/common/AuthRouterComponent";
import React from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AuthRouterComponent role="admin">
        <div className="flex min-h-screen fixed top-0 left-0 right-0 bottom-0">
          {/* admin sider */}
          <AdminSider />
          <div className="flex-1 overflow-y-scroll">
            {/* admin nav */}
            <AdminNavbar />
            <DynamicBreadcrumb />
            <main className="w-full mt-3">{children}</main>
          </div>
        </div>
      </AuthRouterComponent>
    </>
  );
};

export default AdminLayout;
