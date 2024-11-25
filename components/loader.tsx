import { Stack } from 'expo-router';
import { Container } from './container';
import { Text } from 'react-native';

export default function Loader() {
  return (
    <>
      <Stack.Screen options={{ title: 'Carregando' }} />
      <Container className="items-center justify-center px-12">
        <Text className="text-center text-white">Aguarde um Momento</Text>
      </Container>
    </>
  );
}
