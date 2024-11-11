import { Link, router, Stack } from 'expo-router';
import { Text } from 'react-native';

import { Button, ButtonText } from '@/components/Button';
import { Container } from '@/components/Container';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';

export default function Login() {
  const handleLogin = () => {
    router.replace('/');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Entrar' }} />
      <Container className="gap-12 px-12">
        <Text className="text-2xl text-white">Entre com sua conta</Text>
        <FormControl isInvalid={false}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField type="text" placeholder="exemplo@cafeteria.com" value="" />
          </Input>
          <FormControlError>
            <FormControlErrorText>Atleast 6 characters are required.</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl isInvalid={false}>
          <FormControlLabel>
            <FormControlLabelText>Senha</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField type="password" placeholder="********" value="" />
          </Input>
          <FormControlError>
            <FormControlErrorText>Atleast 6 characters are required.</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Link href="/" className="self-end text-sm text-beige">
          Esqueci minha senha
        </Link>
        <Button>
          <ButtonText>Continuar</ButtonText>
        </Button>
        <Button appearance="secondary">
          <ButtonText appearance="secondary">Entrar como convidado</ButtonText>
        </Button>
      </Container>
    </>
  );
}
