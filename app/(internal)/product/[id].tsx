import { FontAwesome } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, Text, View } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import CartButton from '@/components/cartButton';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { products } from '@/mocks/products';
import useCartStore from '@/stores/useCartStore';
import colors from '@/styles/colors';
import { format } from '@/utils/format';

type Params = {
  id: string;
};

export default function Product() {
  const { id } = useLocalSearchParams<Params>();
  const product = products.find((product) => product.id.toString() === id);

  const { addProduct, removeProduct, isProductInCart } = useCartStore();

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

  const isInCart = isProductInCart(product.id);

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

            <View className="gap-1">
              <Text className="text-lg text-beige">Categorias</Text>
              <View className="flex-row flex-wrap gap-3">
                {product.categories.map((category) => (
                  <Text key={category} className="rounded-2xl bg-orange px-3 py-2 text-white">
                    {category}
                  </Text>
                ))}
              </View>
            </View>

            <Button
              className="mt-4"
              onPress={() => (isInCart ? removeProduct(product.id) : addProduct(product))}>
              <FontAwesome name={isInCart ? 'trash' : 'cart-plus'} size={16} color={colors.brown} />
              <ButtonText>{isInCart ? 'Remover do Carrinho' : 'Adicionar ao Carrinho'}</ButtonText>
            </Button>
          </View>
        </Container>
      </ScrollViewContainer>
      <CartButton />
    </>
  );
}
