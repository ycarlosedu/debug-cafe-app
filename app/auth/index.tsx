import { Link, router, Stack } from 'expo-router';
import { Text } from 'react-native';

import { Button, ButtonText } from '@/components/Button';
import { Container } from '@/components/Container';

export default function Login() {
  const handleLogin = () => {
    router.replace('/');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Entrar' }} />
      <Container className="gap-12 px-12">
        <Text className="text-2xl text-white">Entre com sua conta</Text>
        <Link href="/" className="self-end text-sm text-beige">
          Esqueci minha senha
        </Link>
        <Button>
          <ButtonText>Continuar</ButtonText>
        </Button>
        <Button appearance="secondary">
          <ButtonText appearance="secondary">Entrar como convidado</ButtonText>
        </Button>
      </Container>
    </>
  );
}
