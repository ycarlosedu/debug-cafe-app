import { Redirect, Stack } from 'expo-router';

import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';
import { USER_TYPE } from '@/constants';

export default function InternalLayout() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || user?.userType === USER_TYPE.CLIENT) {
    return <Redirect href="/(home)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.brown,
        },
        headerTintColor: colors.beige,
        headerBackground: () => null,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="orders" options={{ title: 'Pedidos em Andamento' }} />
    </Stack>
  );
}
