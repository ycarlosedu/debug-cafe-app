import { FontAwesome } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';

import { Button, ButtonText } from '@/components/Button';
import { Container } from '@/components/Container';

export default function Profile() {
  const handleLogout = () => {
    router.replace('/auth');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Meu Perfil' }} />
      <Container className="gap-6 px-4">
        <Link href="/" asChild>
          <Button>
            <FontAwesome size={24} name="user" />
            <ButtonText>Minhas informações</ButtonText>
            <FontAwesome size={24} name="arrow-right" />
          </Button>
        </Link>
        <Button onPress={handleLogout}>
          <ButtonText>Sair</ButtonText>
        </Button>
      </Container>
    </>
  );
}
