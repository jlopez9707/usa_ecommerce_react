import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PageProps } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Table, Input as AntInput, Button as AntButton, Tag, Space, notification, Popconfirm, Pagination, Modal } from 'antd';
import { SearchOutlined, ClearOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface FilterState {
  search: string;
  sort_field: string;
  sort_direction: 'asc' | 'desc';
  page: number;
  per_page: number;
}

interface Props {
  users: {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
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
  { title: 'Usuarios', href: '/admin/users' },
];

const defaultFilters: FilterState = {
  search: '',
  sort_field: 'created_at',
  sort_direction: 'desc',
  page: 1,
  per_page: 10
};

export default function UserIndex({ users, filters }: Props) {
  const { flash = {} } = usePage<PageProps>().props;
  const [notificationApi, contextHolder] = notification.useNotification();
  const [filterState, setFilterState] = useState<FilterState>({
    search: filters.search ?? '',
    sort_field: filters.sort_field ?? 'created_at',
    sort_direction: filters.sort_direction ?? 'desc',
    page: filters.page ?? 1,
    per_page: filters.per_page ?? 10
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (flash?.success && typeof flash.success === 'string' && flash.success.trim() !== '') {
      notificationApi.success({
        message: 'Éxito',
        description: flash.success,
        placement: 'topRight',
        duration: 4
      });
    }

    if (flash?.error && typeof flash.error === 'string' && flash.error.trim() !== '') {
      notificationApi.error({
        message: 'Error',
        description: flash.error,
        placement: 'topRight',
        duration: 4
      });
    }
  }, [flash]);

  const updateFilter = (field: keyof FilterState, value: string | number) => {
    setFilterState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = (newFilters: Partial<FilterState> = {}) => {
    setLoading(true);

    const updatedFilters = {
      ...filterState,
      ...newFilters
    };

    setFilterState(updatedFilters);

    const filteredParams = Object.fromEntries(
      Object.entries(updatedFilters).filter(([, value]) =>
        value !== undefined && value !== null && value !== ''
      )
    );

    router.get(route('admin.users.index'), filteredParams as Record<string, string>, {
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
    setFilterState(defaultFilters);
    router.get(route('admin.users.index'), {}, {
      preserveState: false,
      replace: true
    });
  }

  function handleSort(sorter: SorterResult<User> | SorterResult<User>[]) {
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
      sort_direction: newSortDirection
    });
  }

  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: '¿Estás seguro de que quieres eliminar este usuario?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        router.delete(route('admin.users.destroy', userId), {
          onError: () => {
            notificationApi.error({
              message: 'Error',
              description: 'Hubo un problema al eliminar el usuario',
              placement: 'topRight',
              duration: 4
            });
          }
        });
      }
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: filterState.sort_field === 'name'
        ? (filterState.sort_direction === 'asc' ? 'ascend' : 'descend')
        : null,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortOrder: filterState.sort_field === 'email'
        ? (filterState.sort_direction === 'asc' ? 'ascend' : 'descend')
        : null,
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const color = role === 'admin' ? 'red' : 'default';
        const text = role === 'admin' ? 'Administrador' : 'Cliente';
        return <Tag color={color}>{text}</Tag>;
      },
      sorter: true,
      sortOrder: filterState.sort_field === 'role'
        ? (filterState.sort_direction === 'asc' ? 'ascend' : 'descend')
        : null,
    },
    {
      title: 'Acciones',
      key: 'action',
      width: 150,
      align: 'center',
      render: (_, record) => (
        <Space size="middle" className="flex justify-center">
          <Link href={route('admin.users.show', record.id)}>
            <AntButton
              type="text"
              icon={<EyeOutlined />}
              title="Ver"
              className="flex items-center justify-center w-8 h-8"
            />
          </Link>
          <Link href={route('admin.users.edit', record.id)}>
            <AntButton
              type="text"
              icon={<EditOutlined />}
              title="Editar"
              className="flex items-center justify-center w-8 h-8"
            />
          </Link>
          <AntButton
            type="text"
            danger
            icon={<DeleteOutlined />}
            title="Eliminar"
            className="flex items-center justify-center w-8 h-8"
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[]
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
      filterState.sort_field !== 'created_at' ||
      filterState.sort_direction !== 'desc' ||
      filterState.per_page !== 10
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gestión de Usuarios" />
      {contextHolder}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lista de Usuarios</CardTitle>
              <div className="flex space-x-2">
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <AntInput
                    placeholder="Buscar usuarios..."
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
                <Link href={route('admin.users.create')}>
                  <AntButton type="primary" icon={<PlusOutlined />}>
                    Añadir Usuario
                  </AntButton>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Table
                columns={columns}
                dataSource={users.data}
                rowKey="id"
                pagination={false}
                onChange={handleTableChange}
                loading={loading}
                size="middle"
                bordered
                sortDirections={['ascend', 'descend', 'ascend']}
                locale={{ emptyText: 'No se encontraron usuarios' }}
              />

              {users.last_page > 1 && (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
                    Mostrando {users.from} a {users.to} de {users.total} resultados
                  </div>
                  <Pagination
                    current={users.current_page}
                    total={users.total}
                    pageSize={users.per_page}
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
