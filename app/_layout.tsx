import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

import '@/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 2, // 2 hours
    },
  },
});

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export const unstable_settings = {
  initialRouteName: '(home)',
};

export default function RootLayout() {
  const handleSplashScreen = () => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 3000);
  };

  return (
    <GluestackUIProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView onLayout={handleSplashScreen} style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(internal)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(team)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
