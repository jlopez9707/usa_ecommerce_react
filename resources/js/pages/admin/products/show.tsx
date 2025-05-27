import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Category } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Product } from '@/types/product';
import {
    Button as AntButton,
    Descriptions,
    Tag,
    Typography,
    Image,
    Divider,
    Space,
    Carousel
} from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Props {
    product: Product & { categories: Category[] };
}


export default function ShowProduct({ product }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Productos', href: '/admin/products' },
        { title: product.name, href: `/admin/products/${product.id}` },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Producto: ${product.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles del Producto</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    {product.images && product.images.length > 0 ? (
                                        <Carousel autoplay className="mb-4">
                                            {product.images.map((image) => (
                                                <div key={image.id}>
                                                    <Image
                                                        src={`/storage/${image.url}`}
                                                        alt={product.name}
                                                        className="rounded-lg"
                                                        style={{ maxHeight: '400px', objectFit: 'cover', margin: '0 auto' }}
                                                    />
                                                </div>
                                            ))}
                                        </Carousel>
                                    ) : (
                                        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                                            <Text type="secondary">Sin imágenes</Text>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <Title level={2}>{product.name}</Title>
                                        <Title level={3} type="success" style={{ marginTop: 8 }}>
                                            ${product.price}
                                        </Title>
                                    </div>

                                    <Divider />

                                    <Descriptions title="Información del Producto" column={1} bordered>
                                        <Descriptions.Item label="Descripción">
                                            {product.description}
                                        </Descriptions.Item>

                                        <Descriptions.Item label="Stock">
                                            <Tag
                                                color={product.stock > 20 ? "green" : product.stock > 5 ? "orange" : "red"}
                                            >
                                                {product.stock} unidades
                                            </Tag>
                                        </Descriptions.Item>

                                        {product.categories && product.categories.length > 0 && (
                                            <Descriptions.Item label="Categorías">
                                                <Space wrap>
                                                    {product.categories.map(category => (
                                                        <Tag key={category.id} color="blue">
                                                            {category.name}
                                                        </Tag>
                                                    ))}
                                                </Space>
                                            </Descriptions.Item>
                                        )}

                                        {product.color && (
                                            <Descriptions.Item label="Color">
                                                {product.color}
                                            </Descriptions.Item>
                                        )}

                                        {product.size && (
                                            <Descriptions.Item label="Talla">
                                                {product.size}
                                            </Descriptions.Item>
                                        )}

                                        {product.material && (
                                            <Descriptions.Item label="Material">
                                                {product.material}
                                            </Descriptions.Item>
                                        )}
                                    </Descriptions>

                                    {product.measurements && Object.keys(product.measurements).length > 0 && (
                                        <div>
                                            <Divider orientation="left">Medidas</Divider>
                                            <Descriptions bordered column={2}>
                                                {Object.entries(product.measurements).map(([key, value]) => (
                                                    <Descriptions.Item key={key} label={key}>
                                                        {value}
                                                    </Descriptions.Item>
                                                ))}
                                            </Descriptions>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <AntButton
                                    icon={<ArrowLeftOutlined />}
                                    onClick={() => window.history.back()}
                                >
                                    Volver
                                </AntButton>
                                <Link href={route('admin.products.edit', product.id)}>
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
