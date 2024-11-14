import { Stack } from 'expo-router';

import { Container } from '@/components/Container';

export default function Orders() {
  return (
    <>
      <Stack.Screen options={{ title: 'Meus Pedidos' }} />
      <Container />
    </>
  );
}
