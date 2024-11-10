import { Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="login"
        options={{
          title: 'Entrar',
          tabBarIcon: ({ color }) => <TabBarIcon name="arrow-right" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
