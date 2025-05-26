import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PageProps } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { Table, Input, Button, Tag, Space, notification, Popconfirm } from 'antd';
import { SearchOutlined, ClearOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Props {
  users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Usuarios', href: '/admin/users' },
];

export default function UserIndex({ users }: Props) {
  const { flash = {} } = usePage<PageProps>().props;
  const [searchText, setSearchText] = useState('');
  const [notificationApi, contextHolder] = notification.useNotification();
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

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

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const deleteUser = (id: number) => {
    router.delete(route('admin.users.destroy', id), {
      onSuccess: () => {
        notificationApi.success({
          message: 'Usuario eliminado',
          description: 'El usuario ha sido eliminado correctamente',
          placement: 'topRight',
          duration: 4
        });
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.role.toLowerCase().includes(value)
    );

    setFilteredUsers(filtered);
  };

  const clearSearch = () => {
    setSearchText('');
    setFilteredUsers(users);
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
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
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link href={route('admin.users.edit', record.id)}>
            <Button type="primary" icon={<EditOutlined />} size="small">
              Editar
            </Button>
          </Link>
          <Popconfirm
            title="¿Estás seguro de eliminar este usuario?"
            onConfirm={() => deleteUser(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Gestión de Usuarios" />
      {contextHolder}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lista de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-between items-center">
                <div className="flex">
                  <Input
                    placeholder="Buscar usuarios..."
                    value={searchText}
                    onChange={handleSearch}
                    prefix={<SearchOutlined />}
                    allowClear
                    className="max-w-md"
                  />
                  {searchText && (
                    <Button onClick={clearSearch} icon={<ClearOutlined />} className="ml-2">
                      Limpiar
                    </Button>
                  )}
                </div>
                <Link href={route('admin.users.create')}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Añadir Usuario
                  </Button>
                </Link>
              </div>

              <Table
                columns={columns}
                dataSource={filteredUsers}
                rowKey="id"
                pagination={{
                  pageSize: 10,
                  hideOnSinglePage: true,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50'],
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
