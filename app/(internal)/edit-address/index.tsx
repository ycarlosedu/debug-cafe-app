import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { Alert } from 'react-native';

import { Container } from '@/components/container';
import RegisterAddressForm, { AddressFormValues } from '@/components/forms/address-form';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { ERROR } from '@/constants';
import { myAddress } from '@/services/address';
import useAuthStore from '@/stores/useAuthStore';
import { applyMask, REGEX } from '@/utils/regex';

export default function Address() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { data: address } = useQuery({
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
    onSuccess: ({ address }) => {
      queryClient.setQueryData(['address', user?.email], address);
      router.back();
    },
    onError: (error: any) => {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    },
  });

  const createAddressMutation = useMutation({
    mutationFn: myAddress.create,
    onSuccess: ({ address }) => {
      queryClient.setQueryData(['address', user?.email], address);
      router.back();
    },
    onError: (error: any) => {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    },
  });

  const onSubmitAddressForm = (data: AddressFormValues) => {
    return address ? updateAddressMutation.mutate(data) : createAddressMutation.mutate(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Alterar Endereço' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-12">
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
