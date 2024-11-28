import { FontAwesome } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { Button, ButtonText } from '@/components/button';
import { Container } from '@/components/container';
import Loader from '@/components/loader';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { Spinner } from '@/components/ui/spinner';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { useMyToast } from '@/hooks/useMyToast';
import { myCreditCards } from '@/services/credit-cards';
import useAuthStore from '@/stores/useAuthStore';
import colors from '@/styles/colors';

export default function CreditCards() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { showToast } = useMyToast();

  const {
    data: creditCards,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['credit-cards', user?.email],
    queryFn: myCreditCards.getAll,
  });

  const deleteCreditCardMutation = useMutation({
    mutationFn: myCreditCards.deleteCard,
    onSuccess: ({ id }) => {
      queryClient.setQueryData(
        ['credit-cards', user?.email],
        creditCards?.filter((card) => card.id !== id)
      );
    },
    onError: (error: any) => {
      return showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Meus Cartões' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-4">
          <View className="gap-4">
            {!creditCards?.length && isSuccess && (
              <Text className="text-center text-xl text-white">Nenhum cartão cadastrado</Text>
            )}
            {isError && (
              <Text className="text-center text-xl text-white">
                Houve um erro ao buscar os cartões
              </Text>
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
