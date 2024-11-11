import { router, Stack } from 'expo-router';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function Register() {
  const handleRegister = () => {
    router.replace('/');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Cadastre-se' }} />
      <Container>
        <ScreenContent path="app/auth/register.tsx" title="Cadastre-se" />
        <Button onPress={handleRegister} title="Continuar" />
      </Container>
    </>
  );
}
