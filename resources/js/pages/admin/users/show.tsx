import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button as AntButton, Descriptions } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: string;
        updated_at: string;
    };
}

export default function ShowUser({ user }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Usuarios', href: '/admin/users' },
        { title: user.name, href: `/admin/users/${user.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Usuario - ${user.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardContent className="pt-6">
                            <Descriptions title="Información del Usuario" column={1} bordered>
                                <Descriptions.Item label="ID">
                                    {user.id}
                                </Descriptions.Item>

                                <Descriptions.Item label="Nombre">
                                    {user.name}
                                </Descriptions.Item>

                                <Descriptions.Item label="Email">
                                    {user.email}
                                </Descriptions.Item>

                                <Descriptions.Item label="Rol">
                                    {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                                </Descriptions.Item>

                                <Descriptions.Item label="Fecha de Creación">
                                    {new Date(user.created_at).toLocaleString()}
                                </Descriptions.Item>

                                <Descriptions.Item label="Última Actualización">
                                    {new Date(user.updated_at).toLocaleString()}
                                </Descriptions.Item>
                            </Descriptions>

                            <div className="flex justify-end space-x-4 mt-6">
                                <AntButton
                                    icon={<ArrowLeftOutlined />}
                                    onClick={() => window.history.back()}
                                >
                                    Volver
                                </AntButton>
                                <Link href={route('admin.users.edit', user.id)}>
                                    <AntButton
                                        type="primary"
                                        icon={<EditOutlined />}
                                    >
                                        Editar
                                    </AntButton>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
