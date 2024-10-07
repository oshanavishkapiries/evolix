
import { DynamicBreadcrumb } from '@/components/admin/Breadcrumb';
import AdminNavbar from '@/components/admin/Navbar';
import AdminSider from '@/components/admin/Sider';
import AuthRouterComponent from '@/components/common/AuthRouterComponent';
import React from 'react'

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <AuthRouterComponent role='admin'>
                <div className="flex min-h-screen w-full">
                    {/* admin sider */}
                    <AdminSider />
                    <div className="flex-1">
                        {/* admin nav */}
                        <AdminNavbar />
                        <DynamicBreadcrumb />
                        <main className="grid gap-6 p-4 lg:grid-cols-2 lg:p-6 xl:grid-cols-3">
                            {children}
                        </main>
                    </div>
                </div>
            </AuthRouterComponent>
        </>
    )
}

export default AdminLayout