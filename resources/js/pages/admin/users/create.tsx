import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  notification,
  Space
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Usuarios', href: '/admin/users' },
  { title: 'Crear Usuario', href: '/admin/users/create' },
];

const { Option } = Select;

export default function UserCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const [form] = Form.useForm();
  const [notificationApi, contextHolder] = notification.useNotification();

  const handleSubmit = () => {
    // Mostrar notificación antes de enviar
    notificationApi.success({
      message: 'Procesando',
      description: 'Creando usuario...',
      placement: 'topRight',
      duration: 2
    });

    post(route('admin.users.store'), {
      onSuccess: () => {
        // La notificación de éxito se mostrará con el flash message
      },
      onError: () => {
        notificationApi.error({
          message: 'Error al crear',
          description: 'Hubo un problema al crear el usuario',
          placement: 'topRight',
          duration: 4
        });
      },
      preserveScroll: true
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Crear Usuario" />
      {contextHolder}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nuevo Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  role: data.role,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label="Nombre"
                    name="name"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre del usuario' }]}
                    validateStatus={errors.name ? 'error' : ''}
                    help={errors.name}
                  >
                    <Input
                      placeholder="Nombre del usuario"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Por favor ingrese el email' },
                      { type: 'email', message: 'Por favor ingrese un email válido' }
                    ]}
                    validateStatus={errors.email ? 'error' : ''}
                    help={errors.email}
                  >
                    <Input
                      placeholder="Email"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[
                      { required: true, message: 'Por favor ingrese la contraseña' },
                      { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' }
                    ]}
                    validateStatus={errors.password ? 'error' : ''}
                    help={errors.password}
                  >
                    <Input.Password
                      placeholder="Contraseña"
                      value={data.password}
                      onChange={e => setData('password', e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Rol"
                    name="role"
                    rules={[{ required: true, message: 'Por favor seleccione un rol' }]}
                    validateStatus={errors.role ? 'error' : ''}
                    help={errors.role}
                  >
                    <Select
                      placeholder="Seleccione un rol"
                      value={data.role}
                      onChange={value => setData('role', value)}
                    >
                      <Option value="admin">Administrador</Option>
                      <Option value="customer">Cliente</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => window.history.back()}
                  >
                    Volver
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    loading={processing}
                  >
                    Crear Usuario
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
