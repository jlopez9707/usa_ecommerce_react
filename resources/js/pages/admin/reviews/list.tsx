import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PageProps } from '@/types';
import { Review } from '@/types/review';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { Head, router, usePage } from '@inertiajs/react';
import { Button as AntButton, Input as AntInput, Modal, Pagination, Space, Table, Tooltip, notification } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';

interface FilterState {
    search: string;
    rating: string;
    status: string;
    sort_field: string;
    sort_direction: 'asc' | 'desc';
    page: number;
    per_page: number;
}

interface Props {
    reviews: {
        data: Review[];
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
        rating?: string;
        status?: string;
        sort_field?: string;
        sort_direction?: 'asc' | 'desc';
        page?: number;
        per_page?: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Valoraciones', href: '/admin/reviews' }];

const defaultFilters: FilterState = {
    search: '',
    rating: '',
    status: '',
    sort_field: 'created_at',
    sort_direction: 'desc',
    page: 1,
    per_page: 10,
};

export default function ReviewList({ reviews, filters }: Props) {
    const { flash = {} } = usePage<PageProps>().props;
    const [notificationApi, contextHolder] = notification.useNotification();
    const [filterState, setFilterState] = useState<FilterState>({
        search: filters.search ?? '',
        rating: filters.rating ?? '',
        status: filters.status ?? '',
        sort_field: filters.sort_field ?? 'created_at',
        sort_direction: filters.sort_direction ?? 'desc',
        page: filters.page ?? 1,
        per_page: filters.per_page ?? 10,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (flash?.success && typeof flash.success === 'string' && flash.success.trim() !== '') {
            notificationApi.success({
                message: 'Éxito',
                description: flash.success,
                placement: 'topRight',
                duration: 4,
            });
        }

        if (flash?.error && typeof flash.error === 'string' && flash.error.trim() !== '') {
            notificationApi.error({
                message: 'Error',
                description: flash.error,
                placement: 'topRight',
                duration: 4,
            });
        }
    }, [flash]);

    const updateFilter = (field: keyof FilterState, value: string | number) => {
        setFilterState((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const applyFilters = (newFilters: Partial<FilterState> = {}) => {
        setLoading(true);

        const updatedFilters = {
            ...filterState,
            ...newFilters,
        };

        setFilterState(updatedFilters);

        const filteredParams = Object.fromEntries(
            Object.entries(updatedFilters).filter(([, value]) => value !== undefined && value !== null && value !== ''),
        );

        router.get(route('admin.reviews.index'), filteredParams as Record<string, string>, {
            preserveState: true,
            replace: true,
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false),
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
        setFilterState(defaultFilters);

        router.get(
            route('admin.reviews.index'),
            {},
            {
                preserveState: false,
                replace: true,
            },
        );
    }

    function handleSort(sorter: SorterResult<Review> | SorterResult<Review>[]) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter;

        if (!field) return;

        let newSortField: string;
        let newSortDirection: 'asc' | 'desc';

        if (order === undefined) {
            newSortField = 'created_at';
            newSortDirection = 'desc';
        } else {
            newSortField = field as string;
            newSortDirection = order === 'ascend' ? 'asc' : 'desc';
        }

        applyFilters({
            sort_field: newSortField,
            sort_direction: newSortDirection,
        });
    }

    const handleDelete = (reviewId: number) => {
        Modal.confirm({
            title: '¿Estás seguro de que quieres eliminar esta valoración?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                router.delete(route('admin.reviews.destroy', reviewId), {
                    onError: () => {
                        notificationApi.error({
                            message: 'Error',
                            description: 'Hubo un problema al eliminar la valoración',
                            placement: 'topRight',
                            duration: 4,
                        });
                    },
                });
            },
        });
    };

    const columns: ColumnsType<Review> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
            sortOrder: filterState.sort_field === 'id' ? (filterState.sort_direction === 'asc' ? 'ascend' : 'descend') : null,
            width: 80,
        },
        {
            title: 'Valoración',
            dataIndex: 'rating',
            key: 'rating',
            sorter: true,
            sortOrder: filterState.sort_field === 'rating' ? (filterState.sort_direction === 'asc' ? 'ascend' : 'descend') : null,
            render: (text) => (
                <Tooltip title={text}>
                    <span className="cursor-pointer">{text}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            sortOrder: filterState.sort_field === 'status' ? (filterState.sort_direction === 'asc' ? 'ascend' : 'descend') : null,
            render: (status) => <span className="font-medium">${status}</span>,
        },
        {
            title: 'Creado',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            sortOrder: filterState.sort_field === 'created_at' ? (filterState.sort_direction === 'asc' ? 'ascend' : 'descend') : null,
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Acciones',
            key: 'actions',
            width: 150,
            align: 'center',
            render: (_, record) => (
                <Space size="middle" className="flex justify-center">
                    {/* <Link href={route('admin.reviews.show', record.id)}>
                        <AntButton type="text" icon={<EyeOutlined />} title="Ver" className="flex items-center justify-center" />
                    </Link>
                    <Link href={route('admin.reviews.edit', record.id)}>
                        <AntButton type="text" icon={<EditOutlined />} title="Editar" className="flex items-center justify-center" />
                    </Link>
                    <AntButton
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        title="Eliminar"
                        className="flex items-center justify-center"
                        onClick={() => handleDelete(record.id)}
                    /> */}
                </Space>
            ),
        },
    ];

    const handleTableChange = (
        pagination: TablePaginationConfig,
        _: Record<string, FilterValue | null>,
        sorter: SorterResult<Review> | SorterResult<Review>[],
    ) => {
        if (pagination.current) {
            handlePageChange(pagination.current);
        }

        if (pagination.pageSize && pagination.pageSize !== filterState.per_page) {
            handlePerPageChange(pagination.pageSize);
        }

        if (sorter) {
            const sorterObj = Array.isArray(sorter) ? sorter[0] : sorter;

            handleSort(sorterObj);
        }
    };

    const hasActiveFilters = () => {
        return !!(
            filterState.search ||
            filterState.rating ||
            filterState.status ||
            filterState.sort_field !== 'created_at' ||
            filterState.sort_direction !== 'desc' ||
            filterState.per_page !== 10
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lista de Valoraciones" />
            {contextHolder}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Lista de Valoraciones</CardTitle>
                            <div className="flex space-x-2">
                                <form onSubmit={handleSearch} className="flex space-x-2">
                                    <AntInput
                                        placeholder="Buscar valoraciones..."
                                        value={filterState.search}
                                        onChange={(e) => updateFilter('search', e.target.value)}
                                        style={{ width: 200 }}
                                        prefix={<SearchOutlined />}
                                        allowClear
                                    />
                                    <AntButton type="primary" htmlType="submit" loading={loading}>
                                        Buscar
                                    </AntButton>
                                    <AntButton onClick={clearFilters} disabled={loading} danger={hasActiveFilters()} icon={<ClearOutlined />}>
                                        Limpiar
                                    </AntButton>
                                </form>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table
                                columns={columns}
                                dataSource={reviews.data}
                                rowKey="id"
                                pagination={false}
                                onChange={handleTableChange}
                                loading={loading}
                                size="middle"
                                bordered
                                sortDirections={['ascend', 'descend', 'ascend']}
                                locale={{ emptyText: 'No se encontraron valoraciones' }}
                            />

                            {reviews.last_page > 1 && (
                                <div className="mt-6 flex flex-col items-center justify-between sm:flex-row">
                                    <div className="mb-4 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                                        Mostrando {reviews.from} a {reviews.to} de {reviews.total} resultados
                                    </div>
                                    <Pagination
                                        current={reviews.current_page}
                                        total={reviews.total}
                                        pageSize={reviews.per_page}
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
