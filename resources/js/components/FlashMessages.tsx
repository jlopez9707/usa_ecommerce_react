import { useEffect } from 'react';
import { notification } from 'antd';
import { usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function FlashMessages() {
  const { flash } = usePage<PageProps>().props;
  const [notificationApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    let hasShownNotification = false;

    if (flash) {
      if (flash.success) {
        notificationApi.success({
          message: 'Éxito',
          description: flash.success,
          placement: 'topRight',
          duration: 2
        });
        hasShownNotification = true;
      }

      if (flash.error) {
        notificationApi.error({
          message: 'Error',
          description: flash.error,
          placement: 'topRight',
          duration: 2
        });
        hasShownNotification = true;
      }

      if (flash.warning) {
        notificationApi.warning({
          message: 'Advertencia',
          description: flash.warning,
          placement: 'topRight',
          duration: 2
        });
        hasShownNotification = true;
      }

      if (flash.info) {
        notificationApi.info({
          message: 'Información',
          description: flash.info,
          placement: 'topRight',
          duration: 2
        });
        hasShownNotification = true;
      }
    }

    if (hasShownNotification) {
      setTimeout(() => {
        router.reload({ only: ['flash'] });
      }, 100);
    }
  }, [flash]);

  return contextHolder;
}
