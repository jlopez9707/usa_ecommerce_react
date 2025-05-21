import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem, Category } from '@/types';
import { Product } from '@/types/product';
import { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Upload,
    Button as AntButton,
    Select,
    Space,
    message,
    Divider,
    Typography
} from 'antd';
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

interface Props {
    product: Product & { categories: Category[] };
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Productos', href: '/products' },
    { title: 'Editar Producto', href: '/products/edit' },
];

export default function EditProduct({ product, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: null as File | null,
        stock: product.stock.toString(),
        category_ids: product.categories ? product.categories.map(cat => cat.id) : [],
    });

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = () => {
        put(route('products.update', product.id), {
            onSuccess: () => {
                messageApi.success('Producto actualizado exitosamente');
            },
            onError: () => {
                messageApi.error('Error al actualizar el producto');
            }
        });
    };

    const handleCategoryChange = (values: number[]) => {
        setData('category_ids', values);
    };

    const handleImageUpload: UploadProps['onChange'] = ({ file }) => {
        if (file.originFileObj) {
            setData('image', file.originFileObj);
        }
    };

    const uploadProps = {
        beforeUpload: (file: File) => {
            setData('image', file);
            return false;
        },
        fileList: data.image ? [{ uid: '-1', name: data.image.name, status: 'done' } as UploadFile] : [],
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Producto" />
            {contextHolder}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Editar Producto</CardTitle>
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
                                    category_ids: data.category_ids,
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
                                        {product.image && (
                                            <div className="mt-2">
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="w-32 h-32 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </Form.Item>
                                </div>

                                <Divider orientation="left">Categorías</Divider>
                                <Form.Item
                                    name="category_ids"
                                    validateStatus={errors.category_ids ? 'error' : ''}
                                    help={errors.category_ids}
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Seleccione categorías"
                                        style={{ width: '100%' }}
                                        value={data.category_ids}
                                        onChange={handleCategoryChange}
                                        optionFilterProp="children"
                                    >
                                        {categories.map(category => (
                                            <Option key={category.id} value={category.id}>
                                                {category.name}
                                            </Option>
                                        ))}
                                    </Select>
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
                                            {processing ? 'Guardando...' : 'Guardar Cambios'}
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
