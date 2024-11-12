import { FontAwesome } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';
import { preview } from 'radon-ide';
import { Image, Text, View } from 'react-native';

import UserImage from '@/assets/images/user.png';
import { Button, ButtonText } from '@/components/Button';
import { Container } from '@/components/Container';
import colors from '@/styles/colors';

preview(<Profile />);

export default function Profile() {
  const handleLogout = () => {
    router.replace('/auth');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Meu Perfil (Cliente)' }} />
      <Container className="gap-6 px-4">
        <View className="flex-row items-center gap-6">
          <Image
            source={UserImage}
            className="rounded-full border-2 border-beige"
            style={{ width: 56, height: 56 }}
          />
          <Text className="text-lg font-medium text-white">Carlos Eduardo</Text>
        </View>

        <Link href="/" asChild>
          <Button className="justify-between">
            <View className="flex-row items-center gap-2">
              <FontAwesome size={24} name="address-card" color={colors.brown} />
              <ButtonText>Minhas informações</ButtonText>
            </View>
            <FontAwesome size={24} name="arrow-right" color={colors.brown} />
          </Button>
        </Link>

        <Link href="/" asChild>
          <Button className="justify-between">
            <View className="flex-row items-center gap-2">
              <FontAwesome size={24} name="map-signs" color={colors.brown} />
              <ButtonText>Meus endereços</ButtonText>
            </View>
            <FontAwesome size={24} name="arrow-right" color={colors.brown} />
          </Button>
        </Link>

        <Link href="/" asChild>
          <Button className="justify-between">
            <View className="flex-row items-center gap-2">
              <FontAwesome size={24} name="credit-card" color={colors.brown} />
              <ButtonText>Minhas formas de pagamento</ButtonText>
            </View>
            <FontAwesome size={24} name="arrow-right" color={colors.brown} />
          </Button>
        </Link>

        <Text className="text-center text-lg font-medium text-beige">Acessos internos</Text>

        <Link href="/internal-access" asChild>
          <Button className="justify-between">
            <View className="flex-row items-center gap-2">
              <FontAwesome size={24} name="users" color={colors.brown} />
              <ButtonText>Acessar como Funcionário</ButtonText>
            </View>
            <FontAwesome size={24} name="arrow-right" color={colors.brown} />
          </Button>
        </Link>

        <Link href="/internal-access" asChild>
          <Button className="justify-between">
            <View className="flex-row items-center gap-2">
              <FontAwesome size={24} name="edit" color={colors.brown} />
              <ButtonText>Acessar como Supervisor</ButtonText>
            </View>
            <FontAwesome size={24} name="arrow-right" color={colors.brown} />
          </Button>
        </Link>

        <Link href="/internal-access" asChild>
          <Button className="justify-between">
            <View className="flex-row items-center gap-2">
              <FontAwesome size={24} name="motorcycle" color={colors.brown} />
              <ButtonText>Acessar como Motoboy</ButtonText>
            </View>
            <FontAwesome size={24} name="arrow-right" color={colors.brown} />
          </Button>
        </Link>

        <Text className="text-center text-lg font-medium text-beige">Funções internas</Text>

        <Link href="/" asChild>
          <Button className="justify-between">
            <View className="flex-row items-center gap-2">
              <FontAwesome size={24} name="users" color={colors.brown} />
              <ButtonText>Pedidos para preparo (funcionários)</ButtonText>
            </View>
            <FontAwesome size={24} name="arrow-right" color={colors.brown} />
          </Button>
        </Link>

        <Link href="/" asChild>
          <Button className="justify-between">
            <View className="flex-row items-center gap-2">
              <FontAwesome size={24} name="edit" color={colors.brown} />
              <ButtonText>Revisar alterações (supervisores)</ButtonText>
            </View>
            <FontAwesome size={24} name="arrow-right" color={colors.brown} />
          </Button>
        </Link>

        <Link href="/" asChild>
          <Button className="justify-between">
            <View className="flex-row items-center gap-2">
              <FontAwesome size={24} name="motorcycle" color={colors.brown} />
              <ButtonText>Pedidos para entrega (motoboys)</ButtonText>
            </View>
            <FontAwesome size={24} name="arrow-right" color={colors.brown} />
          </Button>
        </Link>

        <Button onPress={handleLogout} className="mt-8">
          <ButtonText>Sair</ButtonText>
        </Button>
      </Container>
    </>
  );
}