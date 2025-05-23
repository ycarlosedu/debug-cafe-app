import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '@/components/container';
import RegisterAddressForm, { AddressFormValues } from '@/components/forms/address-form';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { useMyToast } from '@/hooks/useMyToast';
import { myAddress } from '@/services/address';
import useAuthStore from '@/stores/useAuthStore';
import { applyMask, REGEX } from '@/utils/regex';

export default function Address() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { showToast } = useMyToast();

  const { data: address, isLoading } = useQuery({
    queryKey: ['address', user?.email],
    queryFn: myAddress.get,
  });

  const defaultValues = {
    cep: address?.cep ? applyMask(address.cep, REGEX.CEP) : '',
    city: address?.city || '',
    street: address?.street || '',
    number: address?.number || '',
  };

  const updateAddressMutation = useMutation({
    mutationFn: myAddress.update,
    onSuccess: ({ address, message }) => {
      queryClient.setQueryData(['address', user?.email], address);
      showToast({
        title: TOAST_TITLE.SUCCESS,
        message,
        action: TOAST_ACTION.SUCCESS,
      });
      router.back();
    },
    onError: (error: any) => {
      return showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    },
  });

  const createAddressMutation = useMutation({
    mutationFn: myAddress.create,
    onSuccess: ({ address, message }) => {
      queryClient.setQueryData(['address', user?.email], address);
      showToast({
        title: TOAST_TITLE.SUCCESS,
        message,
        action: TOAST_ACTION.SUCCESS,
      });
      router.back();
    },
    onError: (error: any) => {
      return showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    },
  });

  const onSubmitAddressForm = (data: AddressFormValues) => {
    return address ? updateAddressMutation.mutate(data) : createAddressMutation.mutate(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Alterar Endereço' }} />
      <ScrollViewContainer>
        <Container className="max-w-lg gap-8 px-12">
          {isLoading && (
            <Text className="text-center text-white">
              Verificando se você possui endereço cadastrado...
            </Text>
          )}
          <RegisterAddressForm
            onSubmit={onSubmitAddressForm}
            defaultValues={defaultValues}
            isLoading={updateAddressMutation.isPending || createAddressMutation.isPending}
          />
        </Container>
      </ScrollViewContainer>
    </>
  );
}
