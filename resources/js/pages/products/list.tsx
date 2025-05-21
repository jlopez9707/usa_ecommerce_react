import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { Pagination } from '../../components/ui/pagination';
import { Product } from '@/types/product';

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        search?: string;
        category?: string;
        min_price?: number;
        max_price?: number;
        sort_field?: string;
        sort_direction?: 'asc' | 'desc';
        page?: number;
        per_page?: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Productos', href: '/products' },
];

export default function ProductList({ products, filters }: Props) {
    const { data, setData, get, processing } = useForm({
        search: filters.search ?? '',
        category: filters.category ?? '',
        min_price: filters.min_price ?? '',
        max_price: filters.max_price ?? '',
        sort_field: filters.sort_field ?? 'created_at',
        sort_direction: filters.sort_direction ?? 'desc',
        page: filters.page ?? 1,
        per_page: filters.per_page ?? 10
    });

    useEffect(() => {
        if (data.page !== filters.page) {
            setData('page', filters.page ?? 1);
        }
    }, [filters.page]);

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setData('page', 1);
        get(route('products.index'), {
            preserveState: true,
        });
    }

    function handlePerPageChange(perPage: number) {
        setData('per_page', perPage);
        setData('page', 1);
        get(route('products.index'), {
            preserveState: true,
        });
    }

    function handlePageChange(page: number) {
        setData('page', page);
        get(route('products.index'), {
            preserveState: true,
        });
    }

    function clearFilters() {
        setData({
            search: '',
            category: '',
            min_price: '',
            max_price: '',
            sort_field: 'created_at',
            sort_direction: 'desc',
            page: 1,
            per_page: 10,
        });
        get(route('products.index'), {
            preserveState: true,
        });
    }

    function handleSort(field: string) {
        const direction = data.sort_field === field && data.sort_direction === 'asc' ? 'desc' : 'asc';
        setData({
            ...data,
            sort_field: field,
            sort_direction: direction,
        });
        get(route('products.index'), {
            preserveState: true,
        });
    }

    // Función para mostrar el indicador de dirección de ordenamiento
    function getSortIndicator(field: string) {
        if (data.sort_field !== field) return null;
        return data.sort_direction === 'asc' ? '↑' : '↓';
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de Productos" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Lista de Productos</CardTitle>
                            <div className="flex space-x-2">
                                <form onSubmit={handleSearch} className="flex space-x-2">
                                    <Input
                                        placeholder="Buscar productos..."
                                        value={data.search}
                                        onChange={e => setData('search', e.target.value)}
                                        className="w-64"
                                    />
                                    <Button type="submit" disabled={processing}>
                                        Buscar
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={clearFilters}
                                        disabled={processing}
                                    >
                                        Limpiar Filtros
                                    </Button>
                                </form>
                                <Button asChild>
                                    <Link href={route('products.create')}>
                                        Crear Producto
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-800">
                                            <th className="px-4 py-2 text-left">
                                                <button
                                                    onClick={() => handleSort('id')}
                                                    className="font-semibold text-sm uppercase flex items-center"
                                                >
                                                    ID {getSortIndicator('id')}
                                                </button>
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                <button
                                                    onClick={() => handleSort('name')}
                                                    className="font-semibold text-sm uppercase flex items-center"
                                                >
                                                    Nombre {getSortIndicator('name')}
                                                </button>
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                <button
                                                    onClick={() => handleSort('price')}
                                                    className="font-semibold text-sm uppercase flex items-center"
                                                >
                                                    Precio {getSortIndicator('price')}
                                                </button>
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                <button
                                                    onClick={() => handleSort('stock')}
                                                    className="font-semibold text-sm uppercase flex items-center"
                                                >
                                                    Stock {getSortIndicator('stock')}
                                                </button>
                                            </th>
                                            <th className="px-4 py-2 text-left">
                                                <button
                                                    onClick={() => handleSort('created_at')}
                                                    className="font-semibold text-sm uppercase flex items-center"
                                                >
                                                    Creado {getSortIndicator('created_at')}
                                                </button>
                                            </th>
                                            <th className="px-4 py-2 text-right">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product) => (
                                            <tr key={product.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
                                                <td className="px-4 py-3">{product.id}</td>
                                                <td className="px-4 py-3">{product.name}</td>
                                                <td className="px-4 py-3 font-medium">${product.price}</td>
                                                <td className="px-4 py-3">{product.stock}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    {new Date(product.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3 text-right space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={route('products.show', product.id)}>
                                                            Ver
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={route('products.edit', product.id)}>
                                                            Editar
                                                        </Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {products.data.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 dark:text-gray-400">
                                        No se encontraron productos
                                    </p>
                                </div>
                            )}

                            {products.last_page > 1 && (
                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
                                        Mostrando {products.from} a {products.to} de {products.total} resultados
                                    </div>
                                    <Pagination
                                        currentPage={products.current_page}
                                        totalPages={products.last_page}
                                        onPageChange={handlePageChange}
                                    />
                                    <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Mostrar:</span>
                                        <select
                                            value={data.per_page}
                                            onChange={(e) => handlePerPageChange(Number(e.target.value))}
                                            className="border rounded p-1 text-sm"
                                        >
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
