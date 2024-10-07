"use client";
import {usePathname} from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";


export function DynamicBreadcrumb() {
    const pathname = usePathname();
    const pathArray = pathname.split('/').filter(Boolean);

    return (
        <Breadcrumb className='my-2 mx-3 max-lg:hidden'>
            <BreadcrumbList> {
                pathArray.map((segment, index) => {
                    const href = `/${
                        pathArray.slice(0, index + 1).join('/')
                    }`;
                    const breadcrumb = segment.charAt(0).toUpperCase() + segment.slice(1);
                    return (
                        <div key={
                                href + index
                            }
                            className="flex items-center">
                            <BreadcrumbItem>
                                <BreadcrumbLink href={href}>
                                    {
                                    breadcrumb === 'Admin' ? 'Home' : breadcrumb
                                }</BreadcrumbLink>
                            </BreadcrumbItem>
                            {
                            pathArray.length == index + 1 ? null : <BreadcrumbSeparator/>
                        } </div>
                    );
                })
            } </BreadcrumbList>
        </Breadcrumb>
    );
}
