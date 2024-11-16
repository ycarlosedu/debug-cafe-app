import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import RegisterAddressForm, {
  RegisterAddressFormValues,
} from '@/components/auth/register-address-form';
import RegisterUserForm, { RegisterUserFormValues } from '@/components/auth/register-user-form';
import { Container } from '@/components/container';
import { ScrollViewContainer } from '@/components/scrollViewContainer';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { ERROR } from '@/constants';

enum STEP {
  USER = 'USER',
  ADDRESS = 'ADDRESS',
}

enum STEP_PROGRESS {
  USER = 50,
  ADDRESS = 100,
}

export default function Register() {
  const [step, setStep] = useState<STEP>(STEP.USER);

  const onSubmitUserForm = (data: RegisterUserFormValues) => {
    console.log(data);
    try {
      // const token = '123';
      // router.replace('/');
      setStep(STEP.ADDRESS);
    } catch (error: any) {
      Alert.alert('Erro', error.msg || ERROR.GENERIC);
    }
  };

  const onSubmitAddressForm = (data: RegisterAddressFormValues) => {
    console.log(data);
    try {
      const token = '123';
      router.replace('/(home)');
    } catch (error: any) {
      Alert.alert('Erro', error.msg || ERROR.GENERIC);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Cadastre-se' }} />
      <ScrollViewContainer>
        <Container className="gap-8 px-12">
          <Progress value={STEP_PROGRESS[step]} size="md" orientation="horizontal">
            <ProgressFilledTrack />
          </Progress>
          {step === STEP.USER && (
            <RegisterUserForm
              onSubmit={onSubmitUserForm}
              title="Cadastre-se conosco"
              submitText="Avançar"
            />
          )}
          {step === STEP.ADDRESS && (
            <RegisterAddressForm
              onSubmit={onSubmitAddressForm}
              title="Cadastre seu endereço"
              submitText="Cadastrar"
            />
          )}
        </Container>
      </ScrollViewContainer>
    </>
  );
}
