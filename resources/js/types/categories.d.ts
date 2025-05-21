export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface Category {
    id: number;
    name: string;
    description: string | null;
    slug: string;
    created_at: string;
    updated_at: string;
}