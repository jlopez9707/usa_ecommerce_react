import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem, Category } from '@/types';
import { Product } from '@/types/product';
import { useEffect } from 'react';

interface Props {
    product: Product & { categories: Category[] };
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Productos', href: '/products' },
    { title: 'Editar Producto', href: '/products/edit' },
];

export default function EditProduct({ product, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: null as File | null,
        stock: product.stock.toString(),
        category_ids: product.categories ? product.categories.map(cat => cat.id) : [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    const handleCategoryChange = (categoryId: string) => {
        const id = parseInt(categoryId);
        const updatedCategories = data.category_ids.includes(id)
            ? data.category_ids.filter((catId) => catId !== id)
            : [...data.category_ids, id];

        setData('category_ids', updatedCategories);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Producto" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Editar Producto</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="price">Precio</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={e => setData('price', e.target.value)}
                                            required
                                        />
                                        {errors.price && (
                                            <p className="text-sm text-red-500">{errors.price}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            value={data.stock}
                                            onChange={e => setData('stock', e.target.value)}
                                            required
                                        />
                                        {errors.stock && (
                                            <p className="text-sm text-red-500">{errors.stock}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image">Imagen</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('image', e.target.files?.[0] || null)}
                                        />
                                        {errors.image && (
                                            <p className="text-sm text-red-500">{errors.image}</p>
                                        )}
                                        {product.image && (
                                            <div className="mt-2">
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="w-32 h-32 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Categorías</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                        {categories.map((category) => (
                                            <div key={category.id} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`category-${category.id}`}
                                                    checked={data.category_ids.includes(category.id)}
                                                    onChange={() => handleCategoryChange(category.id.toString())}
                                                    className="rounded"
                                                />
                                                <label htmlFor={`category-${category.id}`}>{category.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.category_ids && (
                                        <p className="text-sm text-red-500">{errors.category_ids}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Input
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        required
                                        className="min-h-[100px]"
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
