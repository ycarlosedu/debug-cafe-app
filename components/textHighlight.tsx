import { Text, TextProps } from 'react-native';

type TextHighlightProps = TextProps;

export default function TextHighlight({ children }: TextHighlightProps) {
  return (
    <Text className="rounded-lg border border-white p-3 text-center text-lg text-white">
      {children}
    </Text>
  );
}
