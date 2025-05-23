import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/types';
import {
    Form,
    Input,
    InputNumber,
    Upload,
    Button as AntButton,
    Checkbox,
    Space,
    message,
    Card as AntCard,
    Divider,
    Typography
} from 'antd';
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { TextArea } = Input;
const { Title } = Typography;

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Productos', href: '/admin/products' },
    { title: 'Crear Producto', href: '/admin/products/create' },
];

export default function CreateProduct({ categories }: Props) {
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

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = () => {
        post(route('products.store'), {
            onSuccess: () => {
                messageApi.success('Producto creado exitosamente');
            },
            onError: () => {
                messageApi.error('Error al crear el producto');
            }
        });
    };

    const handleCategoryChange = (categoryId: number, checked: boolean) => {
        const updatedCategories = checked
            ? [...data.category_ids, categoryId]
            : data.category_ids.filter((id) => id !== categoryId);

        setData('category_ids', updatedCategories);
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
            <Head title="Crear Producto" />
            {contextHolder}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Crear Nuevo Producto</CardTitle>
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
}
