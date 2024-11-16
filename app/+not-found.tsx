import { Link, Stack } from 'expo-router';
import { Text } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container className="h-screen items-center justify-center gap-4 px-4">
        <Text className="text-3xl font-bold text-white">Essa página não existe.</Text>
        <Link href="/(home)" className="mt-4 pt-4" asChild>
          <Button>
            <ButtonText>Ir para página Inicial</ButtonText>
          </Button>
        </Link>
      </Container>
    </>
  );
}
