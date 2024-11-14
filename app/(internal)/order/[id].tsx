import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { Container } from '@/components/cContainer';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import TextHighlight from '@/components/textHighlight';

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
        <Container className="gap-6 px-12">
          <Text className="text-center text-base text-white">
            Pedido nº 1234 - 01/01/2024 às 00:00
          </Text>
          <TextHighlight>Pedido em Andamento</TextHighlight>
          <Text className="text-center text-2xl text-white">Total: R$ 23,90</Text>
          <View className="gap-2">
            <Text className="text-lg text-beige">Forma de Pagamento</Text>
            <TextHighlight>Cartão Visa 6040</TextHighlight>
          </View>
          <View className="gap-2">
            <Text className="text-lg text-beige">Endereço de Entrega</Text>
            <TextHighlight>Rua Santo Alfredo</TextHighlight>
          </View>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
