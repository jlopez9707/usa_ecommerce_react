import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StoreSettingProps {
  name: string;
  description: string;
  value: string;
}

export default function Index({ storeSettings }: { storeSettings: StoreSettingProps[] }) {
  return (
    <>
      <Head title="Configuraciones" />

      <AppLayout>
        <div className="container">
          <h1 className="text-2xl font-bold mb-5">Configuraciones de la tienda</h1>

          <Card>
            <CardHeader>
              <CardTitle>Configuraciones</CardTitle>
              <CardDescription>
                Administre las configuraciones generales de su tienda
              </CardDescription>
            </CardHeader>
            <CardContent>
              {storeSettings && storeSettings.length > 0 ? (
                <div className="space-y-4">
                  {storeSettings.map((setting: StoreSettingProps, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium">{setting.name}</h3>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                      <p className="text-sm mt-2">{setting.value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay configuraciones disponibles.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </>
  );
}
