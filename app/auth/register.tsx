import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { Alert } from 'react-native';

import { Container } from '@/components/container';
import RegisterUserForm, {
  RegisterUserFormValues,
} from '@/components/forms/register-user-info-form';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { ERROR } from '@/constants';
import { auth } from '@/services/auth';
import useAuthStore from '@/stores/useAuthStore';

export default function Register() {
  const { handleLogin } = useAuthStore();

  const signUpMutation = useMutation({
    mutationFn: auth.signUp,
    onSuccess: ({ token, user }) => {
      handleLogin(token, user);
      router.replace('/(home)');
    },
    onError: (error: any) => {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    },
  });

  const onSubmitUserForm = (data: RegisterUserFormValues) => {
    signUpMutation.mutate(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Cadastre-se' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-12">
          <RegisterUserForm
            onSubmit={onSubmitUserForm}
            title="Cadastre-se conosco"
            submitText="Avançar"
          />
        </Container>
      </ScrollViewContainer>
    </>
  );
}
