import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Category } from '@/types/categories';
import {
    Form,
    Input,
    InputNumber,
    Upload,
    Button as AntButton,
    Select,
    Space,
    notification,
    Card as AntCard,
    Divider,
    Typography
} from 'antd';
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

interface Props {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Productos', href: '/products' },
    { title: 'Crear Producto', href: '/products/create' },
];

export default function CreateProduct({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        images: [] as File[],
        measurements: {},
        stock: '',
        category_ids: [] as number[],
        color: '',
        size: '',
        material: '',
    });

    const [form] = Form.useForm();
    const [notificationApi, contextHolder] = notification.useNotification();

    const handleSubmit = () => {
        // Mostrar notificación antes de enviar (para que se vea aunque haya redirección)
        notificationApi.success({
            message: 'Procesando',
            description: 'Creando producto...',
            placement: 'topRight',
            duration: 2
        });

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('stock', data.stock);

        // Añadir múltiples imágenes
        data.images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        // Añadir categorías
        data.category_ids.forEach(id => {
            formData.append('category_ids[]', id.toString());
        });

        // Añadir campos opcionales si existen
        if (data.color) formData.append('color', data.color);
        if (data.size) formData.append('size', data.size);
        if (data.material) formData.append('material', data.material);

        // Enviar formulario
        post(route('products.store'), {
            data: formData,
            onSuccess: () => {
                // No es necesario mostrar notificación aquí, ya se mostrará con el flash message
            },
            onError: () => {
                notificationApi.error({
                    message: 'Error al crear',
                    description: 'Hubo un problema al crear el producto',
                    placement: 'topRight',
                    duration: 4
                });
            },
            // Preservar el flash después de la redirección
            preserveScroll: true
        });
    };

    const handleCategoryChange = (values: number[]) => {
        setData('category_ids', values);
    };

    const handleImagesUpload: UploadProps['onChange'] = ({ fileList }) => {
        const files = fileList
            .filter(file => !!file.originFileObj)
            .map(file => file.originFileObj) as File[];

        setData('images', files);
    };

    const uploadProps = {
        beforeUpload: (file: File) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                notificationApi.error({
                    message: 'Error de archivo',
                    description: 'Solo se permiten archivos de imagen',
                    placement: 'topRight'
                });
                return Upload.LIST_IGNORE;
            }
            return false;
        },
        fileList: data.images.map((file, index) => ({
            uid: `-${index}`,
            name: file.name,
            status: 'done',
            url: URL.createObjectURL(file)
        })) as UploadFile[],
        onChange: handleImagesUpload,
        multiple: true,
        listType: 'picture-card',
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
                                </div>

                                    <Form.Item
                                    label="Imágenes"
                                    name="images"
                                    validateStatus={errors.images ? 'error' : ''}
                                    help={errors.images}
                                    >
                                    <Upload {...uploadProps}>
                                        <div>
                                            <UploadOutlined />
                                            <div style={{ marginTop: 8 }}>Subir imágenes</div>
                                        </div>
                                        </Upload>
                                    </Form.Item>

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
