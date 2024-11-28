import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';

import { Container } from '@/components/container';
import RegisterUserForm, {
  RegisterUserFormValues,
} from '@/components/forms/register-user-info-form';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { useMyToast } from '@/hooks/useMyToast';
import { auth } from '@/services/auth';
import useAuthStore from '@/stores/useAuthStore';

export default function Register() {
  const { handleLogin } = useAuthStore();
  const { showToast } = useMyToast();

  const signUpMutation = useMutation({
    mutationFn: auth.signUp,
    onSuccess: ({ token, user }) => {
      handleLogin(token, user);
      router.replace('/(home)');
    },
    onError: (error: any) => {
      return showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
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
            isLoading={signUpMutation.isPending}
          />
        </Container>
      </ScrollViewContainer>
    </>
  );
}
