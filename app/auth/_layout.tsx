import { Redirect, Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/tabBarIcon';
import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';

export default function AuthLayout() {
  const { isAuthenticated, isGuest } = useAuthStore();

  if (isAuthenticated || isGuest) {
    return <Redirect href="/(home)" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerBackgroundContainerStyle: {
          backgroundColor: colors.brown,
        },
        headerTintColor: colors.transparent,
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
          title: 'Entrar',
          tabBarIcon: ({ color }) => <TabBarIcon name="arrow-right" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Cadastre-se',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
