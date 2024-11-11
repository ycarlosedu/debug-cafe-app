import { Stack } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Debug Café' }} />
      <Container>
        <ScreenContent path="app/home/index.tsx" title="Home" />
      </Container>
    </>
  );
}
