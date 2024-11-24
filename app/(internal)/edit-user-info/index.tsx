import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { Alert } from 'react-native';

import { Container } from '@/components/container';
import ChangeUserInfoForm, {
  ChangeUserInfoFormValues,
} from '@/components/forms/change-user-info-form';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { ERROR } from '@/constants';
import { user } from '@/services/user';
import useAuthStore from '@/stores/useAuthStore';

export default function UserInfo() {
  const { handleChangeUserInfos } = useAuthStore();

  const updateUserMutation = useMutation({
    mutationFn: user.updateInfo,
    onSuccess: ({ user }) => {
      handleChangeUserInfos(user);
      router.back();
    },
    onError: (error: any) => {
      Alert.alert('Erro', error.message || ERROR.GENERIC);
    },
  });

  const onSubmitUserForm = (data: ChangeUserInfoFormValues) => {
    updateUserMutation.mutate(data);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Alterar Informações' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-12">
          <ChangeUserInfoForm
            onSubmit={onSubmitUserForm}
            isLoading={updateUserMutation.isPending}
          />
        </Container>
      </ScrollViewContainer>
    </>
  );
}
