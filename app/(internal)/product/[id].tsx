import { FontAwesome } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { products } from '@/mocks/products';
import colors from '@/styles/colors';
import { format } from '@/utils/format';

type Params = {
  id: string;
};

export default function Product() {
  const { id } = useLocalSearchParams<Params>();
  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return (
      <>
        <Stack.Screen options={{ title: 'Oops' }} />
        <Container className="items-center justify-center px-12">
          <Text className="text-center text-white">Produto não encontrado</Text>
        </Container>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollViewContainer>
        <Container>
          <Image
            source={product.image}
            className="w-full border-2 border-beige"
            style={{ height: 250 }}
          />

          <View className="gap-4 px-4">
            <View key={product.id} className="flex-row items-center justify-between p-3">
              <Text className="text-3xl text-white">
                {format.toBrazillianCurrency(product.price)}
              </Text>
              <Button size="icon">
                <FontAwesome name="heart-o" size={16} color={colors.brown} />
              </Button>
            </View>

            <Text className="text-base text-gray-light">{product.description}</Text>

            <Button>
              <FontAwesome name="cart-plus" size={16} color={colors.brown} />
              <ButtonText>Adicionar ao Carrinho</ButtonText>
            </Button>
          </View>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
