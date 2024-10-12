import Navbar from "@/components/common/Navbar";
import AdminSider from "@/components/common/Sider";
import AuthRouterComponent from "@/components/common/AuthRouterComponent";
import React from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AuthRouterComponent role="user">
        <div className="flex min-h-screen fixed top-0 left-0 right-0 bottom-0">
          {/* sider */}
          <AdminSider />
          <div className="flex-1 overflow-y-scroll">
            {/* nav */}
            <Navbar />
            <main className="w-full mt-3 mb-16">{children} </main>
          </div>
        </div>
      </AuthRouterComponent>
    </>
  );
};

export default AdminLayout;
