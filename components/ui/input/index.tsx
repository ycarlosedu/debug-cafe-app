'use client';
import React, { useMemo } from 'react';
import { createInput } from '@gluestack-ui/input';
import { Svg } from 'react-native-svg';
import { View, Pressable, TextInput, Platform } from 'react-native';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import {
  withStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext';
import { withStyleContextAndStates } from '@gluestack-ui/nativewind-utils/withStyleContextAndStates';
import { cssInterop } from 'nativewind';
import { withStates } from '@gluestack-ui/nativewind-utils/withStates';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
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

const PrimitiveIcon = React.forwardRef<
  React.ElementRef<typeof Svg>,
  IPrimitiveIcon
>(
  (
    {
      height,
      width,
      fill,
      color,
      classNameColor,
      stroke = 'currentColor',
      as: AsComp,
      ...props
    },
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
      colorProps = { ...colorProps, fill: fill };
    }
    if (stroke !== 'currentColor') {
      colorProps = { ...colorProps, stroke: stroke };
    } else if (stroke === 'currentColor' && color !== undefined) {
      colorProps = { ...colorProps, stroke: color };
    }

    if (AsComp) {
      return <AsComp ref={ref} {...props} {...sizeProps} {...colorProps} />;
    }
    return (
      <Svg ref={ref} height={height} width={width} {...colorProps} {...props} />
    );
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
  base: 'border border-beige py-3 px-1 rounded-lg flex-row overflow-hidden content-center data-[hover=true]:border-outline-400 data-[focus=true]:border-primary-700 data-[focus=true]:hover:border-primary-700 data-[disabled=true]:opacity-40 data-[disabled=true]:hover:border-background-300 items-center',
});

const inputIconStyle = tva({
  base: 'justify-center items-center text-typography-400 fill-none',
});

const inputSlotStyle = tva({
  base: 'justify-center items-center web:disabled:cursor-not-allowed',
});

const inputFieldStyle = tva({
  base: 'flex-1 text-typography-900 py-auto px-3 placeholder:text-gray-light h-full ios:leading-[0px] web:cursor-text web:data-[disabled=true]:cursor-not-allowed',
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
    return (
      <UIInput
        ref={ref}
        {...props}
        className={inputStyle({  class: className })}
      />
    );
  }
);

type IInputIconProps = React.ComponentProps<typeof UIInput.Icon> & {
  className?: string;
};

const InputIcon = React.forwardRef<
  React.ElementRef<typeof UIInput.Icon>,
  IInputIconProps
>(({ className, ...props }, ref) => {

  return (
    <UIInput.Icon
      ref={ref}
      {...props}
      className={inputIconStyle({
        class: className,
      })}
    />
  );
});

type IInputSlotProps = React.ComponentProps<typeof UIInput.Slot> &
  VariantProps<typeof inputSlotStyle> & { className?: string };

const InputSlot = React.forwardRef<
  React.ElementRef<typeof UIInput.Slot>,
  IInputSlotProps
>(({ className, ...props }, ref) => {
  return (
    <UIInput.Slot
      ref={ref}
      {...props}
      className={inputSlotStyle({
        class: className,
      })}
    />
  );
});

type IInputFieldProps = React.ComponentProps<typeof UIInput.Input> &
  VariantProps<typeof inputFieldStyle> & { className?: string };

const InputField = React.forwardRef<
  React.ElementRef<typeof UIInput.Input>,
  IInputFieldProps
>(({ className, ...props }, ref) => {
  return (
    <UIInput.Input
      ref={ref}
      {...props}
      className={inputFieldStyle({
        class: className,
      })}
    />
  );
});

Input.displayName = 'Input';
InputIcon.displayName = 'InputIcon';
InputSlot.displayName = 'InputSlot';
InputField.displayName = 'InputField';

export { Input, InputField, InputIcon, InputSlot };
