import { router, Stack } from 'expo-router';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function Login() {
  const handleLogin = () => {
    router.replace('/');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Entrar' }} />
      <Container>
        <ScreenContent path="app/auth/index.tsx" title="Entrar" />
        <Button onPress={handleLogin} title="Continuar" />
      </Container>
    </>
  );
}
