import { router, Stack } from 'expo-router';

import { Button, ButtonText } from '@/components/Button';
import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';

export default function Profile() {
  const handleLogout = () => {
    router.replace('/auth');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Meu Perfil' }} />
      <Container>
        <ScreenContent path="app/home/profile.tsx" title="Meu Perfil" />
        <Button appearance="secondary" onPress={handleLogout}>
          <ButtonText appearance="secondary">Sair</ButtonText>
        </Button>
      </Container>
    </>
  );
}
