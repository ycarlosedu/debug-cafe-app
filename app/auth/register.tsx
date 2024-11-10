import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Register() {
  return (
    <>
      <Stack.Screen options={{ title: 'Cadastrar' }} />
      <Container>
        <ScreenContent path="app/auth/register.tsx" title="Cadastrar" />
      </Container>
    </>
  );
}
