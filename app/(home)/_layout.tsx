import { Redirect, Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/tabBarIcon';
import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';

export default function HomeLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerBackgroundContainerStyle: {
          backgroundColor: colors.brown,
        },
        headerTintColor: colors.beige,
        headerBackground: () => null,
        headerTitleAlign: 'center',
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.brown,
        tabBarStyle: {
          backgroundColor: colors.beige,
          height: 80,
          alignItems: 'center',
        },
        tabBarItemStyle: {
          paddingVertical: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-orders"
        options={{
          title: 'Meus Pedidos',
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Meu Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
