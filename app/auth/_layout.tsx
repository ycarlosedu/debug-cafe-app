import { Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/TabBarIcon';
import colors from '@/styles/colors';

export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        headerBackgroundContainerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.secondary,
        headerBackground: () => null,
        headerTitleAlign: 'center',
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.secondary,
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
