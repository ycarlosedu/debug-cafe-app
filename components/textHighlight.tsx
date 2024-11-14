import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { Text, TextProps } from 'react-native';

const textStyle = tva({
  base: 'rounded-lg border border-white p-3 text-center text-lg text-white',
});

type TextHighlightProps = TextProps;

export default function TextHighlight({ className, children, ...props }: TextHighlightProps) {
  return (
    <Text className={textStyle({ class: className })} {...props}>
      {children}
    </Text>
  );
}
