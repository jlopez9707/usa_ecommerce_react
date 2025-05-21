import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/types/categories';

interface Props {
    category: Category;
}

export default function ShowCategory({ category }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Categorías', href: '/categories' },
        { title: category.name, href: `/categories/${category.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Categoría: ${category.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Detalles de la Categoría</CardTitle>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <Link href={route('categories.edit', category.id)}>
                                        Editar
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <Link href={route('categories.index')}>
                                        Volver
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium">Información General</h3>
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                ID
                                            </p>
                                            <p>{category.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Nombre
                                            </p>
                                            <p>{category.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Fecha de Creación
                                            </p>
                                            <p>{new Date(category.created_at).toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Última Actualización
                                            </p>
                                            <p>{new Date(category.updated_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {category.description && (
                                    <div>
                                        <h3 className="text-lg font-medium">Descripción</h3>
                                        <p className="mt-2">{category.description}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
