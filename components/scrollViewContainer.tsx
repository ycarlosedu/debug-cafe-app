import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { ScrollViewProps } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const containerStyle = tva({
  base: 'flex-1 bg-brown',
});

type Props = ScrollViewProps;

export const ScrollViewContainer = ({ children, className, ...props }: Props) => {
  return (
    <ScrollView
      className={containerStyle({ class: className })}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      {...props}>
      {children}
    </ScrollView>
  );
};
