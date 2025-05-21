import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Product } from '@/types/product';

interface Props {
    product: Product & { categories: Category[] };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Productos', href: '/products' },
    { title: 'Detalles del Producto', href: '/products/show' },
];

export default function ShowProduct({ product }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Producto: ${product.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Detalles del Producto</CardTitle>
                            <div className="flex space-x-4">
                                <Button
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Volver
                                </Button>
                                <Button
                                    onClick={() => window.location.href = route('products.edit', product.id)}
                                >
                                    Editar
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    {product.image && (
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-full h-96 object-cover rounded-lg"
                                        />
                                    )}
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold">{product.name}</h2>
                                        <p className="text-3xl font-bold text-primary mt-2">
                                            ${product.price}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold">Descripción</h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {product.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold">Stock</h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {product.stock} unidades
                                                </p>
                                            </div>

                                            {product.categories && product.categories.length > 0 && (
                                                <div>
                                                    <h3 className="text-lg font-semibold">Categorías</h3>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {product.categories.map(category => (
                                                            <span
                                                                key={category.id}
                                                                className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
                                                            >
                                                                {category.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {product.color && (
                                                <div>
                                                    <h3 className="text-lg font-semibold">Color</h3>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        {product.color}
                                                    </p>
                                                </div>
                                            )}

                                            {product.size && (
                                                <div>
                                                    <h3 className="text-lg font-semibold">Talla</h3>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        {product.size}
                                                    </p>
                                                </div>
                                            )}

                                            {product.material && (
                                                <div>
                                                    <h3 className="text-lg font-semibold">Material</h3>
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        {product.material}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {product.measurements && Object.keys(product.measurements).length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-semibold">Medidas</h3>
                                                <div className="grid grid-cols-2 gap-4 mt-2">
                                                    {Object.entries(product.measurements).map(([key, value]) => (
                                                        <div key={key}>
                                                            <span className="font-medium">{key}:</span>{' '}
                                                            <span className="text-gray-600 dark:text-gray-400">
                                                                {value}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
