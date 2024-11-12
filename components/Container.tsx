import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

const containerStyle = tva({
  base: 'flex w-full flex-1 flex-col bg-brown pb-6',
});

type Props = SafeAreaViewProps;

export const Container = ({ children, className, ...props }: Props) => {
  return (
    <ScrollView
      className="flex-1 bg-brown"
      contentContainerStyle={{
        alignItems: 'center',
      }}>
      <SafeAreaView className={containerStyle({ class: className })} {...props}>
        {children}
      </SafeAreaView>
    </ScrollView>
  );
};
