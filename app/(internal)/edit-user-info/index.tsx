import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';

import { Container } from '@/components/container';
import ChangeUserInfoForm, {
  ChangeUserInfoFormValues,
} from '@/components/forms/change-user-info-form';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { useMyToast } from '@/hooks/useMyToast';
import { user } from '@/services/user';
import useAuthStore from '@/stores/useAuthStore';

export default function UserInfo() {
  const { handleChangeUserInfos } = useAuthStore();
  const { showToast } = useMyToast();

  const updateUserMutation = useMutation({
    mutationFn: user.updateInfo,
    onSuccess: ({ user, message }) => {
      handleChangeUserInfos(user);
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
