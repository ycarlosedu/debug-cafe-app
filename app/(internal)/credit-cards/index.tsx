import { FontAwesome } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { Spinner } from '@/components/ui/spinner';
import { ERROR } from '@/constants';
import { myCreditCards } from '@/services/credit-cards';
import colors from '@/styles/colors';
import { secureStore } from '@/utils/secureStore';

export default function CreditCards() {
  const queryClient = useQueryClient();

  const { data: creditCards } = useQuery({
    queryKey: ['credit-cards', secureStore.getToken()],
    queryFn: myCreditCards.getAll,
  });

  const deleteCreditCardMutation = useMutation({
    mutationFn: myCreditCards.deleteCard,
    onSuccess: ({ id }) => {
      queryClient.setQueryData(
        ['credit-cards', secureStore.getToken()],
        creditCards?.filter((card) => card.id !== id)
      );
    },
    onError: (error: any) => {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    },
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Meus Cartões' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-4">
          <View className="gap-4">
            {creditCards?.length === 0 && (
              <Text className="text-center text-xl text-white">Nenhum cartão cadastrado</Text>
            )}
            {creditCards?.map((card) => {
              const isLoading =
                deleteCreditCardMutation.variables === card.id &&
                deleteCreditCardMutation.isPending;

              return (
                <View
                  key={card.id}
                  className="flex-row items-center justify-between rounded-xl border border-white px-4 py-3">
                  <Text className="text-xl text-white">{card.cardNumber}</Text>
                  <TouchableOpacity
                    disabled={isLoading}
                    onPress={() => deleteCreditCardMutation.mutate(card.id)}>
                    {isLoading ? (
                      <Spinner color={colors.white} />
                    ) : (
                      <FontAwesome name="trash" size={24} color={colors.white} />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
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
