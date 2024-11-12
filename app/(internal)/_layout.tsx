import { Stack } from 'expo-router';

import colors from '@/styles/colors';

export default function InternalLayout() {
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
      <Stack.Screen name="internal-access" options={{ title: 'Acesso Interno' }} />
    </Stack>
  );
}
