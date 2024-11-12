import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, TextProps } from 'react-native';

const buttonStyle = tva({
  base: 'items-center justify-center shadow-md',
  variants: {
    appearance: {
      primary: 'bg-beige',
      secondary: 'border border-beige bg-brown',
    },
    size: {
      full: 'w-full rounded-3xl px-5 py-3',
      icon: 'rounded-full p-3',
    },
  },
});

type ButtonProps = TouchableOpacityProps & VariantProps<typeof buttonStyle>;

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ children, className, appearance = 'primary', size = 'full', ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...props}
        className={buttonStyle({ class: className, appearance, size })}>
        {children}
      </TouchableOpacity>
    );
  }
);

const textStyle = tva({
  base: 'text-center text-xl font-medium tracking-wide',
  variants: {
    appearance: {
      primary: 'text-brown',
      secondary: 'text-beige',
    },
  },
});

type ButtonTextProps = TextProps & VariantProps<typeof textStyle>;

export const ButtonText = ({
  className,
  children,
  appearance = 'primary',
  ...props
}: ButtonTextProps) => {
  return (
    <Text className={textStyle({ class: className, appearance })} {...props}>
      {children}
    </Text>
  );
};
