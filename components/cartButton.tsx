import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Fab } from './ui/fab';

import useCartStore from '@/stores/useCartStore';
import colors from '@/styles/colors';

export default function CartButton() {
  const { products } = useCartStore();

  const hasProductsInCart = Boolean(products.length);

  return (
    <Fab size="lg" onPress={() => router.push('/cart')}>
      <View className="relative items-center justify-center">
        {hasProductsInCart && (
          <Text className="absolute -top-9 z-20 h-8 w-8 rounded-full border border-beige bg-brown text-center text-2xl text-beige">
            {products.length}
          </Text>
        )}
        <FontAwesome name="cart-arrow-down" size={20} color={colors.beige} />
      </View>
    </Fab>
  );
}
