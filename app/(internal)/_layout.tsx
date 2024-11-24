import { Redirect, Stack } from 'expo-router';

import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';

export default function InternalLayout() {
  const { isAuthenticated, isGuest } = useAuthStore();

  if (!isAuthenticated && !isGuest) {
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
      <Stack.Screen name="internal-access/[user]" options={{ title: 'Acesso Interno' }} />
    </Stack>
  );
}
