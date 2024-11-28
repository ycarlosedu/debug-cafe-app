import { Redirect, Stack } from 'expo-router';

import { isUserFromTeam } from '@/constants';
import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';

export default function InternalLayout() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !isUserFromTeam(user?.userType)) {
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
      <Stack.Screen name="orders/index" />
      <Stack.Screen name="pending-order/[id]" />
      <Stack.Screen name="add-product/index" />
      <Stack.Screen name="edit-product/[id]" />
    </Stack>
  );
}
