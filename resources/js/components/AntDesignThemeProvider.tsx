import React, { useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useAppearance } from '@/hooks/use-appearance';

interface AntDesignThemeProviderProps {
  children: React.ReactNode;
}

export default function AntDesignThemeProvider({ children }: AntDesignThemeProviderProps) {
  const { appearance } = useAppearance();
  const [isDarkMode, setIsDarkMode] = useState(appearance === 'dark');

  // Actualizar el tema cuando cambie el modo de apariencia
  useEffect(() => {
    // Si es 'system', verificamos la preferencia del sistema
    if (appearance === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);

      // Agregar listener para cambios en la preferencia del sistema
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Si es 'dark' o 'light' explícitamente
      setIsDarkMode(appearance === 'dark');
    }
  }, [appearance]);

  // Configuración del tema de Ant Design
  const themeConfig = {
    // Algoritmo de tema: oscuro o claro
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    // Colores personalizados
    token: {
      colorPrimary: '#1677ff', // Color primario
      borderRadius: 6, // Radio de borde para componentes
    },
    // Configuración de componentes específicos
    components: {
      Table: {
        colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
        headerBg: isDarkMode ? '#1f1f1f' : '#fafafa',
      },
      Card: {
        colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
      },
      Button: {
        colorPrimary: '#1677ff',
      }
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      {children}
    </ConfigProvider>
  );
}
