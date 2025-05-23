import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Table, Input as AntInput, Button as AntButton, Space, Tooltip, Pagination } from 'antd';
import { SearchOutlined, ClearOutlined, PlusOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { router } from '@inertiajs/react';
import { Category } from '@/types/categories';

interface FilterState {
    search: string;
    sort_field: string;
    sort_direction: 'asc' | 'desc';
    page: number;
    per_page: number;
}

interface Props {
    categories: {
        data: Category[];
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
        sort_field?: string;
        sort_direction?: 'asc' | 'desc';
        page?: number;
        per_page?: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Categorías', href: '/admin/categories' },
];

// Valores por defecto para los filtros
const defaultFilters: FilterState = {
    search: '',
    sort_field: 'created_at',
    sort_direction: 'desc',
    page: 1,
    per_page: 10
};

export default function CategoryList({ categories, filters }: Props) {
    // Estado único para todos los filtros
    const [filterState, setFilterState] = useState<FilterState>({
        search: filters.search ?? '',
        sort_field: filters.sort_field ?? 'created_at',
        sort_direction: filters.sort_direction ?? 'desc',
        page: filters.page ?? 1,
        per_page: filters.per_page ?? 10
    });
    const [loading, setLoading] = useState(false);

    // Función para actualizar un campo específico del estado
    const updateFilter = (field: keyof FilterState, value: string | number) => {
        setFilterState(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Función para aplicar los filtros
    const applyFilters = (newFilters: Partial<FilterState> = {}) => {
        setLoading(true);

        // Combinar el estado actual con los nuevos filtros
        const updatedFilters = {
            ...filterState,
            ...newFilters
        };

        // Actualizar el estado con los nuevos valores
        setFilterState(updatedFilters);

        // Filtramos los parámetros vacíos para no enviarlos
        const filteredParams = Object.fromEntries(
            Object.entries(updatedFilters).filter(([, value]) =>
                value !== undefined && value !== null && value !== ''
            )
        );

        // Usamos router.get de Inertia para navegar a la URL con los filtros
        router.get(route('admin.categories.index'), filteredParams as Record<string, string>, {
            preserveState: true,
            replace: true,
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false)
        });
    };

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        applyFilters({ page: 1 });
    }

    function handlePerPageChange(newPerPage: number) {
        applyFilters({ per_page: newPerPage, page: 1 });
    }

    function handlePageChange(newPage: number) {
        applyFilters({ page: newPage });
    }

    function clearFilters() {
        // Resetear todos los filtros a los valores por defecto
        setFilterState(defaultFilters);

        // Limpiar todos los filtros en la URL
        router.get(route('admin.categories.index'), {}, {
            preserveState: false,
            replace: true
        });
    }

    function handleSort(sorter: SorterResult<Category> | SorterResult<Category>[]) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter;

        if (!field) return;

        let newSortField: string;
        let newSortDirection: 'asc' | 'desc';

        // Si order es undefined (tercer click), volvemos al orden predeterminado
        if (order === undefined) {
            newSortField = 'created_at';
            newSortDirection = 'desc';
        } else {
            // Normal: ascendente o descendente
            newSortField = field as string;
            newSortDirection = order === 'ascend' ? 'asc' : 'desc';
        }

        applyFilters({
            sort_field: newSortField,
            sort_direction: newSortDirection
        });
    }

    // Configuración de las columnas para la tabla de Ant Design
    const columns: ColumnsType<Category> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            sortOrder: filterState.sort_field === 'id'
                ? (filterState.sort_direction === 'asc' ? 'ascend' : 'descend')
                : null,
            width: 80,
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortOrder: filterState.sort_field === 'name'
                ? (filterState.sort_direction === 'asc' ? 'ascend' : 'descend')
                : null,
            render: (text) => <Tooltip title={text}><span className="cursor-pointer">{text}</span></Tooltip>,
        },
        {
            title: 'Creado',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            sortOrder: filterState.sort_field === 'created_at'
                ? (filterState.sort_direction === 'asc' ? 'ascend' : 'descend')
                : null,
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Acciones',
            key: 'actions',
            width: 120,
            render: (_, record) => (
                <Space size="small">
                    <Link href={route('admin.categories.show', record.id)}>
                        <AntButton
                            type="text"
                            icon={<EyeOutlined />}
                            title="Ver"
                        />
                    </Link>
                    <Link href={route('admin.categories.edit', record.id)}>
                        <AntButton
                            type="text"
                            icon={<EditOutlined />}
                            title="Editar"
                        />
                    </Link>
                </Space>
            ),
        },
    ];

    // Manejador para cambios en la tabla (ordenamiento y paginación)
    const handleTableChange = (
        pagination: TablePaginationConfig,
        _: Record<string, FilterValue | null>,
        sorter: SorterResult<Category> | SorterResult<Category>[]
    ) => {
        // Manejar cambios de página
        if (pagination.current) {
            handlePageChange(pagination.current);
        }

        // Manejar cambios de elementos por página
        if (pagination.pageSize && pagination.pageSize !== filterState.per_page) {
            handlePerPageChange(pagination.pageSize);
        }

        // Manejar cambios de ordenamiento
        if (sorter) {
            // Extraer la información de orden (puede ser un array o un objeto único)
            const sorterObj = Array.isArray(sorter) ? sorter[0] : sorter;

            // Pasar al manejador de ordenamiento siempre, incluso si no hay orden (para resetear)
            handleSort(sorterObj);
        }
    };

    // Verificar si hay filtros activos
    const hasActiveFilters = () => {
        return !!(
            filterState.search ||
            filterState.sort_field !== 'created_at' ||
            filterState.sort_direction !== 'desc' ||
            filterState.per_page !== 10
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de Categorías" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Lista de Categorías</CardTitle>
                            <div className="flex space-x-2">
                                <form onSubmit={handleSearch} className="flex space-x-2">
                                    <AntInput
                                        placeholder="Buscar categorías..."
                                        value={filterState.search}
                                        onChange={e => updateFilter('search', e.target.value)}
                                        style={{ width: 200 }}
                                        prefix={<SearchOutlined />}
                                        allowClear
                                    />
                                    <AntButton
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Buscar
                                    </AntButton>
                                    <AntButton
                                        onClick={clearFilters}
                                        disabled={loading}
                                        danger={hasActiveFilters()}
                                        icon={<ClearOutlined />}
                                    >
                                        Limpiar
                                    </AntButton>
                                </form>
                                <Link href={route('admin.categories.create')}>
                                    <AntButton type="primary" icon={<PlusOutlined />}>
                                        Crear Categoría
                                    </AntButton>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table
                                columns={columns}
                                dataSource={categories.data}
                                rowKey="id"
                                pagination={false}
                                onChange={handleTableChange}
                                loading={loading}
                                size="middle"
                                bordered
                                sortDirections={['ascend', 'descend', 'ascend']}
                                locale={{ emptyText: 'No se encontraron categorías' }}
                            />

                            {categories.last_page > 1 && (
                                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
                                        Mostrando {categories.from} a {categories.to} de {categories.total} resultados
                                    </div>
                                    <Pagination
                                        current={categories.current_page}
                                        total={categories.total}
                                        pageSize={categories.per_page}
                                        onChange={handlePageChange}
                                        showSizeChanger
                                        onShowSizeChange={(_, size) => handlePerPageChange(size)}
                                        pageSizeOptions={['10', '25', '50', '100']}
                                        showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} registros`}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
