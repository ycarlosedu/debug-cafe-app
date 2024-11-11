import { Stack } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Buscar Produtos' }} />
      <Container>
        <ScreenContent path="app/home/search.tsx" title="Buscar" />
      </Container>
    </>
  );
}
