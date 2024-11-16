import { router, Stack } from 'expo-router';
import { Alert } from 'react-native';

import { Container } from '@/components/container';
import RegisterUserForm, { RegisterUserFormValues } from '@/components/forms/user-info-form';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { ERROR } from '@/constants';

export default function UserInfo() {
  const onSubmitUserForm = (data: RegisterUserFormValues) => {
    console.log(data);
    try {
      router.back();
    } catch (error: any) {
      Alert.alert('Erro', error.msg || ERROR.GENERIC);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Alterar Informações' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-12">
          <RegisterUserForm onSubmit={onSubmitUserForm} />
        </Container>
      </ScrollViewContainer>
    </>
  );
}
