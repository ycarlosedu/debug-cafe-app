import { Stack } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function Orders() {
  return (
    <>
      <Stack.Screen options={{ title: 'Meus Pedidos' }} />
      <Container>
        <ScreenContent path="app/home/orders.tsx" title="Meus Pedidos" />
      </Container>
    </>
  );
}
