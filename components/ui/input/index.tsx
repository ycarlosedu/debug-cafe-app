'use client';
import { createInput } from '@gluestack-ui/input';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { withStates } from '@gluestack-ui/nativewind-utils/withStates';
import { withStyleContext } from '@gluestack-ui/nativewind-utils/withStyleContext';
import { withStyleContextAndStates } from '@gluestack-ui/nativewind-utils/withStyleContextAndStates';
import { cssInterop } from 'nativewind';
import React, { useMemo } from 'react';
import { View, Pressable, TextInput, Platform } from 'react-native';
import { Svg } from 'react-native-svg';
const SCOPE = 'INPUT';

type IPrimitiveIcon = {
  height?: number | string;
  width?: number | string;
  fill?: string;
  color?: string;
  stroke?: string;
  as?: React.ElementType;
  className?: string;
  classNameColor?: string;
};

const PrimitiveIcon = React.forwardRef<React.ElementRef<typeof Svg>, IPrimitiveIcon>(
  (
    { height, width, fill, color, classNameColor, stroke = 'currentColor', as: AsComp, ...props },
    ref
  ) => {
    color = color ?? classNameColor;
    const sizeProps = useMemo(() => {
      if (height && width) return { height, width };
      if (height) return { height };
      if (width) return { width };
      return {};
    }, [height, width]);

    let colorProps = {};
    if (fill) {
      colorProps = { ...colorProps, fill };
    }
    if (stroke !== 'currentColor') {
      colorProps = { ...colorProps, stroke };
    } else if (stroke === 'currentColor' && color !== undefined) {
      colorProps = { ...colorProps, stroke: color };
    }

    if (AsComp) {
      return <AsComp ref={ref} {...props} {...sizeProps} {...colorProps} />;
    }
    return <Svg ref={ref} height={height} width={width} {...colorProps} {...props} />;
  }
);

const InputWrapper = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentProps<typeof View>
>(({ ...props }, ref) => {
  return <View {...props} ref={ref} />;
});

const UIInput = createInput({
  // @ts-ignore
  Root:
    Platform.OS === 'web'
      ? withStyleContext(InputWrapper, SCOPE)
      : withStyleContextAndStates(InputWrapper, SCOPE),
  Icon: PrimitiveIcon,
  Slot: Pressable,
  Input: Platform.OS === 'web' ? TextInput : withStates(TextInput),
});

const inputStyle = tva({
  base: 'flex-row content-center items-center overflow-hidden rounded-lg border border-beige px-1 py-3 outline-none data-[invalid=true]:border-error-900 data-[focus=true]:border-white data-[disabled=true]:opacity-40 data-[disabled=true]:hover:border-background-300',
});

const inputIconStyle = tva({
  base: 'items-center justify-center fill-none text-typography-400',
});

const inputSlotStyle = tva({
  base: 'mr-2 items-center justify-center web:disabled:cursor-not-allowed',
});

const inputFieldStyle = tva({
  base: 'py-auto ios:leading-[0px] h-full flex-1 px-3 text-white placeholder:text-gray-light web:cursor-text web:data-[disabled=true]:cursor-not-allowed',
});

cssInterop(InputWrapper, { className: 'style' });
cssInterop(UIInput.Slot, { className: 'style' });
cssInterop(UIInput.Input, {
  className: { target: 'style', nativeStyleToProp: { textAlign: true } },
});
//@ts-ignore
cssInterop(UIInput.Icon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
});

type IInputProps = React.ComponentProps<typeof UIInput> &
  VariantProps<typeof inputStyle> & { className?: string };
const Input = React.forwardRef<React.ElementRef<typeof UIInput>, IInputProps>(
  ({ className, ...props }, ref) => {
    return <UIInput ref={ref} {...props} className={inputStyle({ class: className })} />;
  }
);

type IInputIconProps = React.ComponentProps<typeof UIInput.Icon> & {
  className?: string;
};

const InputIcon = React.forwardRef<React.ElementRef<typeof UIInput.Icon>, IInputIconProps>(
  ({ className, ...props }, ref) => {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({
          class: className,
        })}
      />
    );
  }
);

type IInputSlotProps = React.ComponentProps<typeof UIInput.Slot> &
  VariantProps<typeof inputSlotStyle> & { className?: string };

const InputSlot = React.forwardRef<React.ElementRef<typeof UIInput.Slot>, IInputSlotProps>(
  ({ className, ...props }, ref) => {
    return (
      <UIInput.Slot
        ref={ref}
        {...props}
        className={inputSlotStyle({
          class: className,
        })}
      />
    );
  }
);

type IInputFieldProps = React.ComponentProps<typeof UIInput.Input> &
  VariantProps<typeof inputFieldStyle> & { className?: string };

const InputField = React.forwardRef<React.ElementRef<typeof UIInput.Input>, IInputFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <UIInput.Input
        ref={ref}
        {...props}
        className={inputFieldStyle({
          class: className,
        })}
      />
    );
  }
);

Input.displayName = 'Input';
InputIcon.displayName = 'InputIcon';
InputSlot.displayName = 'InputSlot';
InputField.displayName = 'InputField';

export { Input, InputField, InputIcon, InputSlot };
