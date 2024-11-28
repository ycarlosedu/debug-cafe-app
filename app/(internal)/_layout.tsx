import { Redirect, Stack } from 'expo-router';

import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';

export default function InternalLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
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
      <Stack.Screen name="add-credit-card/index" />
      <Stack.Screen name="cart/index" />
      <Stack.Screen name="credit-cards/index" />
      <Stack.Screen name="edit-address/index" />
      <Stack.Screen name="edit-user-info/index" />
      <Stack.Screen name="internal-access/[user]" />
      <Stack.Screen name="order/[id]" />
      <Stack.Screen name="order-feedback/[id]" />
      <Stack.Screen name="product/[id]" />
      <Stack.Screen name="reset-password/[token]" />
    </Stack>
  );
}
