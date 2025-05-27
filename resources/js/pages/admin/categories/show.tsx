import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/types/categories';
import {
    Button as AntButton,
    Descriptions,
    Typography,
    Divider,
} from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Props {
    category: Category;
}

export default function ShowCategory({ category }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Categorías', href: '/admin/categories' },
        { title: category.name, href: `/admin/categories/${category.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Categoría: ${category.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles de la Categoría</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <Title level={2}>{category.name}</Title>
                                </div>

                                <Divider />

                                <Descriptions title="Información de la Categoría" column={1} bordered>
                                    <Descriptions.Item label="ID">
                                        {category.id}
                                    </Descriptions.Item>

                                    {category.description && (
                                        <Descriptions.Item label="Descripción">
                                            {category.description}
                                        </Descriptions.Item>
                                    )}

                                    <Descriptions.Item label="Fecha de Creación">
                                        {new Date(category.created_at).toLocaleString()}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Última Actualización">
                                        {new Date(category.updated_at).toLocaleString()}
                                    </Descriptions.Item>
                                </Descriptions>
                                <div className="flex justify-end space-x-4 mt-6">
                                    <AntButton
                                        icon={<ArrowLeftOutlined />}
                                        onClick={() => window.history.back()}
                                    >
                                        Volver
                                    </AntButton>
                                    <Link href={route('admin.categories.edit', category.id)}>
                                        <AntButton
                                            type="primary"
                                            icon={<EditOutlined />}
                                        >
                                            Editar
                                        </AntButton>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
