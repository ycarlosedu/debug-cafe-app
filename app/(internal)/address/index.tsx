import { router, Stack } from 'expo-router';
import { Alert } from 'react-native';

import RegisterAddressForm, {
  RegisterAddressFormValues,
} from '@/components/auth/register-address-form';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { ERROR } from '@/constants';

export default function Address() {
  const onSubmitAddressForm = (data: RegisterAddressFormValues) => {
    console.log(data);
    try {
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', error.msg || ERROR.GENERIC);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Alterar Endereço' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-12">
          <RegisterAddressForm onSubmit={onSubmitAddressForm} />
        </Container>
      </ScrollViewContainer>
    </>
  );
}
