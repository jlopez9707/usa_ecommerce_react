import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem } from '@/types';
import { Category } from '@/types/categories';
import {
    Form,
    Input,
    Button as AntButton,
    Space,
    notification,
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
interface Props {
    category: Category;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Categorías', href: '/admin/categories' },
    { title: 'Editar Categoría', href: '/admin/categories/edit' },
];

export default function EditCategory({ category }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: category.name,
        _method: 'PUT',
    });

    const [form] = Form.useForm();

    React.useEffect(() => {
        form.setFieldsValue({
            name: data.name,
        });
    }, []);

    const [notificationApi, contextHolder] = notification.useNotification();

    const handleSubmit = () => {
        // Mostrar notificación antes de enviar (para que se vea aunque haya redirección)
        notificationApi.success({
            message: 'Procesando',
            description: 'Actualizando categoría...',
            placement: 'topRight',
            duration: 2
        });

        // En lugar de usar put directamente, usamos post con método spoofing
        post(route('admin.categories.update', category.id), {
            onSuccess: () => {
                // No es necesario mostrar notificación aquí, ya se mostrará con el flash message
            },
            onError: () => {
                notificationApi.error({
                    message: 'Error al actualizar',
                    description: 'Hubo un problema al actualizar la categoría',
                    placement: 'topRight',
                    duration: 4
                });
            },
            // Preservar el flash después de la redirección
            preserveScroll: true
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Categoría" />
            {contextHolder}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Editar Categoría</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                initialValues={{
                                    name: data.name,
                                    description: data.description,
                                }}
                            >
                                <Form.Item
                                    label="Nombre"
                                    name="name"
                                    rules={[{ required: true, message: 'Por favor ingrese el nombre de la categoría' }]}
                                    validateStatus={errors.name ? 'error' : ''}
                                    help={errors.name}
                                >
                                    <Input
                                        placeholder="Nombre de la categoría"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item className="flex justify-end">
                                    <Space>
                                        <AntButton
                                            onClick={() => window.history.back()}
                                            icon={<ArrowLeftOutlined />}
                                        >
                                            Cancelar
                                        </AntButton>
                                        <AntButton
                                            type="primary"
                                            htmlType="submit"
                                            loading={processing}
                                            icon={<SaveOutlined />}
                                        >
                                            {processing ? 'Guardando...' : 'Actualizar Categoría'}
                                        </AntButton>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
