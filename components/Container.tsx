import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { SafeAreaView } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

const containerStyle = tva({
  base: 'flex flex-1 items-center bg-brown text-white',
});

type Props = SafeAreaViewProps & {
  children: React.ReactNode;
};

export const Container = ({ children, className, ...props }: Props) => {
  return (
    <SafeAreaView className={containerStyle({ class: className })} {...props}>
      {children}
    </SafeAreaView>
  );
};
