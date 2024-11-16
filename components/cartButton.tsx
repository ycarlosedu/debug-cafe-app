import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Fab } from './ui/fab';

import colors from '@/styles/colors';

export default function CartButton() {
  return (
    <Fab size="lg" onPress={() => router.push('/cart')}>
      <FontAwesome name="cart-arrow-down" size={20} color={colors.beige} />
    </Fab>
  );
}
