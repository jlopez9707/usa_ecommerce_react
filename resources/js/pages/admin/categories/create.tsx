import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    Input,
    Button as AntButton,
    Space,
    notification,
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';

const { TextArea } = Input;

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Categorías', href: '/admin/categories' },
    { title: 'Crear Categoría', href: '/admin/categories/create' },
];

export default function CreateCategory() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const [form] = Form.useForm();

    const [notificationApi, contextHolder] = notification.useNotification();

    const handleSubmit = () => {
        // Mostrar notificación antes de enviar (para que se vea aunque haya redirección)
        notificationApi.success({
            message: 'Procesando',
            description: 'Creando categoría...',
            placement: 'topRight',
            duration: 2
        });

        post(route('admin.categories.store'), {
            onSuccess: () => {
                // No es necesario mostrar notificación aquí, ya se mostrará con el flash message
            },
            onError: () => {
                notificationApi.error({
                    message: 'Error al crear',
                    description: 'Hubo un problema al crear la categoría',
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
            <Head title="Crear Categoría" />
            {contextHolder}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Crear Nueva Categoría</CardTitle>
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
                                            {processing ? 'Guardando...' : 'Crear Categoría'}
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
