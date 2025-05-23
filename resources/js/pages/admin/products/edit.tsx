import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BreadcrumbItem } from '@/types';
import { Product } from '@/types/product';
import {
    Form,
    Input,
    InputNumber,
    Upload,
    Button as AntButton,
    Select,
    Space,
    notification,
    Divider,
} from 'antd';
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps, UploadListType } from 'antd/es/upload/interface';
import React from 'react';
import { Category } from '@/types/categories';

const { TextArea } = Input;
const { Option } = Select;

interface Props {
    product: Product & { categories: Category[] };
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Productos', href: '/admin/products' },
    { title: 'Editar Producto', href: '/admin/products/edit' },
];

export default function EditProduct({ product, categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        newImages: [] as File[],
        stock: product.stock.toString(),
        category_ids: product.categories ? product.categories.map(cat => cat.id) : [],
        deleteImageIds: [] as number[],
        _method: 'PUT',
    });

    const [form] = Form.useForm();

    // Establecer valores iniciales del formulario cuando se carga el componente
    React.useEffect(() => {
        form.setFieldsValue({
            name: data.name,
            description: data.description,
            price: data.price ? parseFloat(data.price) : undefined,
            stock: data.stock ? parseInt(data.stock) : undefined,
            category_ids: data.category_ids,
        });
    }, []);

    const [notificationApi, contextHolder] = notification.useNotification();

    const handleSubmit = () => {
        // Mostrar notificación antes de enviar (para que se vea aunque haya redirección)
        notificationApi.success({
            message: 'Procesando',
            description: 'Actualizando producto...',
            placement: 'topRight',
            duration: 2
        });

        // En lugar de usar put directamente, usamos post con método spoofing
        post(route('admin.products.update', product.id), {
            forceFormData: true,
            onSuccess: () => {
                // Limpiar imágenes después de guardar
                setData('newImages', []);

                // No es necesario mostrar notificación aquí, ya se mostrará con el flash message
            },
            onError: () => {
                notificationApi.error({
                    message: 'Error al actualizar',
                    description: 'Hubo un problema al actualizar el producto',
                    placement: 'topRight',
                    duration: 4
                });
            },
            // Preservar el flash después de la redirección
            preserveScroll: true
        });
    };

    const handleCategoryChange = (values: number[]) => {
        console.log('Categorías seleccionadas:', values);
        setData('category_ids', values);
    };

    const handleNewImagesUpload: UploadProps['onChange'] = ({ fileList }) => {
        const files = fileList
            .filter(file => !!file.originFileObj)
            .map(file => file.originFileObj) as File[];

        console.log('Nuevas imágenes para subir:', files.length);
        console.log('Nombres de archivos:', files.map(f => f.name));

        setData('newImages', files);

        // Mensaje para confirmar al usuario
        if (files.length > 0) {
            notificationApi.success({
                message: 'Imágenes seleccionadas',
                description: `${files.length} imagen(es) lista(s) para subir`,
                placement: 'topRight'
            });
        }
    };

    const handleDeleteImage = (imageId: number) => {
        // Eliminación directa sin confirmación
        const updatedDeleteIds = [...data.deleteImageIds, imageId];
        setData('deleteImageIds', updatedDeleteIds);
        notificationApi.success({
            message: 'Imagen marcada',
            description: 'Imagen marcada para eliminación',
            placement: 'topRight'
        });
        console.log('Imágenes a eliminar:', updatedDeleteIds);
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
            return false; // Evitar subida automática
        },
        fileList: data.newImages.map((file, index) => ({
            uid: `-${index}`,
            name: file.name,
            status: 'done',
            url: URL.createObjectURL(file)
        })) as UploadFile[],
        onChange: handleNewImagesUpload,
        multiple: true,
        listType: 'picture-card' as UploadListType,
        accept: 'image/*',
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
                                </div>

                                {/* Imágenes existentes */}
                                {product.images && product.images.length > 0 && (
                                    <div className="mb-6">
                                        <Divider orientation="left">Imágenes Actuales</Divider>
                                        <div className="flex flex-wrap gap-4">
                                            {product.images.map(image => {
                                                // Verificar si la imagen está marcada para eliminar
                                                const isMarkedForDeletion = data.deleteImageIds.includes(image.id);

                                                // Solo mostrar imágenes que no están marcadas para eliminar
                                                if (!isMarkedForDeletion) {
                                                    return (
                                                        <div key={image.id} className="relative">
                                                            <img
                                                                src={`/storage/${image.url}`}
                                                                alt={product.name}
                                                                className="w-32 h-32 object-cover rounded"
                                                            />
                                                            <AntButton
                                                                type="primary"
                                                                danger
                                                                icon={<DeleteOutlined />}
                                                                size="small"
                                                                className="absolute -top-2 -right-2"
                                                                onClick={() => handleDeleteImage(image.id)}
                                                            />
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Subir nuevas imágenes */}
                                <Form.Item
                                    label="Nuevas Imágenes"
                                    name="newImages"
                                    validateStatus={errors.newImages ? 'error' : ''}
                                    help={errors.newImages}
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
                                    rules={[{ required: true, message: 'Debe seleccionar al menos una categoría' }]}
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
                                            {processing ? 'Guardando...' : 'Actualizar Producto'}
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
