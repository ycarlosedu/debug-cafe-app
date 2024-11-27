import { Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from './container';

export default function Loader() {
  return (
    <>
      <Stack.Screen options={{ title: 'Carregando...' }} />
      <Container className="items-center justify-center px-12">
        <Text className="text-center text-white">Aguarde um momento</Text>
      </Container>
    </>
  );
}
