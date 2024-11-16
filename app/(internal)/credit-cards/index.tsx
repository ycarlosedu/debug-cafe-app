import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { creditCards } from '@/mocks/credit-cards';
import colors from '@/styles/colors';

export default function CreditCards() {
  return (
    <>
      <Stack.Screen options={{ title: 'Meus Cartões' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-4">
          <View className="gap-4">
            {creditCards.map((card) => (
              <View
                key={card.id}
                className="flex-row items-center justify-between rounded-xl border border-white px-4 py-3">
                <Text className="text-xl text-white">{card.name}</Text>
                <TouchableOpacity>
                  <FontAwesome name="trash" size={24} color={colors.white} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <Link href="/add-credit-card" asChild>
            <Button>
              <FontAwesome name="plus" size={20} color={colors.brown} />
              <ButtonText>Adicionar Cartão</ButtonText>
            </Button>
          </Link>
        </Container>
      </ScrollViewContainer>
    </>
  );
}
