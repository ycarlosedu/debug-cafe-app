import { Link, Stack } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: 'Entrar' }} />
      <Container>
        <ScreenContent path="app/auth/index.tsx" title="Entrar" />
        <Link href="/home" asChild>
          <Button title="Continuar" />
        </Link>
      </Container>
    </>
  );
}
