import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '@/components/Container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';

type Params = {
  id: string;
};

export default function Order() {
  const params = useLocalSearchParams<Params>();
  console.log('🚀 ~ Order ~ params:', params.id);

  return (
    <>
      <Stack.Screen options={{ title: 'Detalhes do Pedido' }} />
      <ScrollViewContainer>
        <Container className="gap-12 px-12" />
      </ScrollViewContainer>
    </>
  );
}
