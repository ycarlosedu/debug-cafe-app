import { FontAwesome } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { Link, Stack } from 'expo-router';
import { preview } from 'radon-ide';
import { Image, Text, View } from 'react-native';

import UserImage from '@/assets/images/user.png';
import { Button, ButtonText } from '@/components/button';
import ConfirmDeleteDialog from '@/components/confirmDeleteDialog';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { TOAST_ACTION, TOAST_TITLE } from '@/components/ui/toast';
import { USER_TYPE, USER_TYPE_LABEL } from '@/constants';
import { useMyToast } from '@/hooks/useMyToast';
import { myAccount } from '@/services/user';
import useAuthStore from '@/stores/useAuthStore';
import useMenuStore, { MENU_STORE } from '@/stores/useMenuStore';
import colors from '@/styles/colors';

preview(<Profile />);

export default function Profile() {
  const { handleLogout, user } = useAuthStore();
  const { handleChangeMenu } = useMenuStore();
  const { showToast } = useMyToast();

  const deleteAccountMutation = useMutation({
    mutationFn: myAccount.deleteAccount,
    onSuccess: ({ message }) => {
      showToast({
        title: TOAST_TITLE.SUCCESS,
        message,
        action: TOAST_ACTION.SUCCESS,
      });
      handleLogout();
    },
    onError: (error: any) => {
      return showToast({
        title: TOAST_TITLE.ERROR,
        message: error.message,
        action: TOAST_ACTION.ERROR,
      });
    },
  });

  return (
    <>
      <Stack.Screen
        options={{ title: `Meu Perfil (${USER_TYPE_LABEL[user?.userType || USER_TYPE.CLIENT]})` }}
      />
      <ScrollViewContainer>
        <Container className="max-w-lg gap-6 px-4">
          <View className="flex-row items-center gap-6">
            <Image
              source={UserImage}
              className="rounded-full border-2 border-beige"
              style={{ width: 56, height: 56 }}
            />
            <Text className="text-lg font-medium text-white">{user?.fullName}</Text>
          </View>

          {user?.userType === USER_TYPE.GUEST && (
            <>
              <Text className="text-center text-lg font-medium text-beige">
                Para acessar suas informações, você deve estar conectado em sua conta!
              </Text>
              <Button className="justify-between" onPress={handleLogout}>
                <View className="flex-row items-center gap-2">
                  <FontAwesome size={24} name="user" color={colors.brown} />
                  <ButtonText>Fazer Login</ButtonText>
                </View>
                <FontAwesome size={24} name="arrow-right" color={colors.brown} />
              </Button>
            </>
          )}

          {user?.userType !== USER_TYPE.GUEST && (
            <>
              <Link href="/edit-user-info" asChild>
                <Button className="justify-between">
                  <View className="flex-row items-center gap-2">
                    <FontAwesome size={24} name="address-card" color={colors.brown} />
                    <ButtonText>Minhas informações</ButtonText>
                  </View>
                  <FontAwesome size={24} name="arrow-right" color={colors.brown} />
                </Button>
              </Link>

              <Link href="/edit-address" asChild>
                <Button className="justify-between">
                  <View className="flex-row items-center gap-2">
                    <FontAwesome size={24} name="map-signs" color={colors.brown} />
                    <ButtonText>Meu endereço</ButtonText>
                  </View>
                  <FontAwesome size={24} name="arrow-right" color={colors.brown} />
                </Button>
              </Link>

              <Link href="/credit-cards" asChild>
                <Button className="justify-between">
                  <View className="flex-row items-center gap-2">
                    <FontAwesome size={24} name="credit-card" color={colors.brown} />
                    <ButtonText>Minhas formas de pagamento</ButtonText>
                  </View>
                  <FontAwesome size={24} name="arrow-right" color={colors.brown} />
                </Button>
              </Link>

              <Text className="text-center text-lg font-medium text-beige">Acessos internos</Text>

              <Link
                disabled={user?.userType === USER_TYPE.STAFF}
                href={{
                  pathname: '/internal-access/[user]',
                  params: {
                    user: USER_TYPE.STAFF,
                  },
                }}
                asChild>
                <Button className="justify-between" disabled={user?.userType === USER_TYPE.STAFF}>
                  <View className="flex-row items-center gap-2">
                    <FontAwesome size={24} name="users" color={colors.brown} />
                    <ButtonText>Acessar como Funcionário</ButtonText>
                  </View>
                  <FontAwesome size={24} name="arrow-right" color={colors.brown} />
                </Button>
              </Link>

              <Link
                disabled={user?.userType === USER_TYPE.MANAGER}
                href={{
                  pathname: '/internal-access/[user]',
                  params: {
                    user: USER_TYPE.MANAGER,
                  },
                }}
                asChild>
                <Button className="justify-between" disabled={user?.userType === USER_TYPE.MANAGER}>
                  <View className="flex-row items-center gap-2">
                    <FontAwesome size={24} name="edit" color={colors.brown} />
                    <ButtonText>Acessar como Supervisor</ButtonText>
                  </View>
                  <FontAwesome size={24} name="arrow-right" color={colors.brown} />
                </Button>
              </Link>

              <Link
                disabled={user?.userType === USER_TYPE.DELIVERY}
                href={{
                  pathname: '/internal-access/[user]',
                  params: {
                    user: USER_TYPE.DELIVERY,
                  },
                }}
                asChild>
                <Button
                  className="justify-between"
                  disabled={user?.userType === USER_TYPE.DELIVERY}>
                  <View className="flex-row items-center gap-2">
                    <FontAwesome size={24} name="motorcycle" color={colors.brown} />
                    <ButtonText>Acessar como Motoboy</ButtonText>
                  </View>
                  <FontAwesome size={24} name="arrow-right" color={colors.brown} />
                </Button>
              </Link>

              {user?.userType !== USER_TYPE.CLIENT && (
                <Text className="text-center text-lg font-medium text-beige">Funções internas</Text>
              )}

              {(user?.userType === USER_TYPE.STAFF || user?.userType === USER_TYPE.MANAGER) && (
                <Link href="/(team)/orders" asChild>
                  <Button className="justify-between">
                    <View className="flex-row items-center gap-2">
                      <FontAwesome size={24} name="users" color={colors.brown} />
                      <ButtonText>Pedidos para preparo</ButtonText>
                    </View>
                    <FontAwesome size={24} name="arrow-right" color={colors.brown} />
                  </Button>
                </Link>
              )}

              {user?.userType === USER_TYPE.MANAGER && (
                <>
                  <Link href="/(team)/add-product" asChild>
                    <Button className="justify-between">
                      <View className="flex-row items-center gap-2">
                        <FontAwesome size={24} name="plus" color={colors.brown} />
                        <ButtonText>Adicionar produtos</ButtonText>
                      </View>
                      <FontAwesome size={24} name="arrow-right" color={colors.brown} />
                    </Button>
                  </Link>

                  <Link href="/(team)/add-category" asChild>
                    <Button className="justify-between">
                      <View className="flex-row items-center gap-2">
                        <FontAwesome size={24} name="tag" color={colors.brown} />
                        <ButtonText>Adicionar categorias</ButtonText>
                      </View>
                      <FontAwesome size={24} name="arrow-right" color={colors.brown} />
                    </Button>
                  </Link>
                </>
              )}

              {user?.userType === USER_TYPE.DELIVERY && (
                <Link href="/(team)/orders" asChild>
                  <Button className="justify-between">
                    <View className="flex-row items-center gap-2">
                      <FontAwesome size={24} name="motorcycle" color={colors.brown} />
                      <ButtonText>Pedidos para entrega</ButtonText>
                    </View>
                    <FontAwesome size={24} name="arrow-right" color={colors.brown} />
                  </Button>
                </Link>
              )}

              <Button onPress={handleLogout} className="mt-8">
                <ButtonText>Sair</ButtonText>
              </Button>

              <Text className="text-center text-lg font-medium text-beige">Cuidado!</Text>
              <Button
                onPress={() => handleChangeMenu(MENU_STORE.DELETE_DIALOG, true)}
                className="bg-error-500">
                <ButtonText className="text-white">Excluir minha conta</ButtonText>
              </Button>

              <ConfirmDeleteDialog
                title="Tem certeza que deseja excluir sua conta?"
                message="Essa ação não poderá ser desfeita."
                handleSubmit={() => deleteAccountMutation.mutate()}
              />
            </>
          )}
        </Container>
      </ScrollViewContainer>
    </>
  );
}
