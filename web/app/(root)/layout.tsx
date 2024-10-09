import AdminNavbar from '@/components/common/Navbar';
import AdminSider from '@/components/common/Sider';
import AuthRouterComponent from '@/components/common/AuthRouterComponent';
import React from 'react'

const AdminLayout = ({children} : Readonly < {
    children: React.ReactNode;
} >) => {
    return (
        <>
            <AuthRouterComponent role='user'>
                <div className="flex min-h-screen w-full">
                    {/* sider */}
                    <AdminSider/>
                    <div className="flex-1">
                        {/* nav */}
                        <AdminNavbar/>
                        <main className="grid gap-6 p-4 lg:grid-cols-2 lg:p-6 xl:grid-cols-3">
                            {children} </main>
                    </div>
                </div>
            </AuthRouterComponent>
        </>
    )
}

export default AdminLayout
