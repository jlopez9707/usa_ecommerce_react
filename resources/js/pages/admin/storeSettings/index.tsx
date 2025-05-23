import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Form, Input, InputNumber, Divider, Checkbox, Space } from "antd";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StoreSettings = () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Configuraciones de la tienda', href: '/admin/store-settings' },
    ];

    const [form] = Form.useForm();

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        image: null as File | null,
        measurements: {},
        stock: '',
        category_ids: [] as number[],
        color: '',
        size: '',
        material: '',
    });

    const handleSubmit = () => {
        post(route('products.store'), {
            onSuccess: () => {
                // messageApi.success('Producto creado exitosamente');
            },
            onError: () => {
                // messageApi.error('Error al crear el producto');
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuraciones de la tienda" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuraciones de la tienda</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                initialValues={{
                                    name: data.name,
                                    description: data.description,
                                    price: data.price ? parseFloat(data.price) : undefined,
                                    stock: data.stock ? parseInt(data.stock) : undefined,
                                }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Form.Item
                                        label="Nombre"
                                        name="name"
                                        rules={[{ required: true, message: 'Por favor ingrese el nombre del producto' }]}
                                        validateStatus={errors.name ? 'error' : ''}
                                        help={errors.name}
                                    >
                                        <Input
                                            placeholder="Nombre del producto"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Precio"
                                        name="price"
                                        rules={[{ required: true, message: 'Por favor ingrese el precio' }]}
                                        validateStatus={errors.price ? 'error' : ''}
                                        help={errors.price}
                                    >
                                        <InputNumber
                                            placeholder="Precio"
                                            min={0}
                                            step={0.01}
                                            precision={2}
                                            style={{ width: '100%' }}
                                            prefix="$"
                                            value={data.price ? parseFloat(data.price) : undefined}
                                            onChange={(value) => setData('price', value ? value.toString() : '')}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Stock"
                                        name="stock"
                                        rules={[{ required: true, message: 'Por favor ingrese el stock' }]}
                                        validateStatus={errors.stock ? 'error' : ''}
                                        help={errors.stock}
                                    >
                                        <InputNumber
                                            placeholder="Stock disponible"
                                            min={0}
                                            style={{ width: '100%' }}
                                            value={data.stock ? parseInt(data.stock) : undefined}
                                            onChange={(value) => setData('stock', value ? value.toString() : '')}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Imagen"
                                        name="image"
                                        validateStatus={errors.image ? 'error' : ''}
                                        help={errors.image}
                                    >
                                        <Upload
                                            {...uploadProps}
                                            onChange={handleImageUpload}
                                            listType="picture"
                                            maxCount={1}
                                        >
                                            <AntButton icon={<UploadOutlined />}>Seleccionar imagen</AntButton>
                                        </Upload>
                                    </Form.Item>
                                </div>

                                <Divider orientation="left">Categorías</Divider>
                                <Form.Item
                                    validateStatus={errors.category_ids ? 'error' : ''}
                                    help={errors.category_ids}
                                >
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                        {categories.map((category) => (
                                            <Checkbox
                                                key={category.id}
                                                checked={data.category_ids.includes(category.id)}
                                                onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                                            >
                                                {category.name}
                                            </Checkbox>
                                        ))}
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    label="Descripción"
                                    name="description"
                                    rules={[{ required: true, message: 'Por favor ingrese la descripción' }]}
                                    validateStatus={errors.description ? 'error' : ''}
                                    help={errors.description}
                                >
                                    <TextArea
                                        placeholder="Descripción del producto"
                                        rows={4}
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
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
                                            {processing ? 'Guardando...' : 'Guardar Producto'}
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
};

export default StoreSettings;
