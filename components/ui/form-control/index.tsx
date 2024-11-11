'use client';
import { Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { Svg } from 'react-native-svg';
import { createFormControl } from '@gluestack-ui/form-control';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import {
  withStyleContext,
  useStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext';
import { cssInterop } from 'nativewind';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';

const SCOPE = 'FORM_CONTROL';

type IPrimitiveIcon = React.ComponentPropsWithoutRef<typeof Svg> & {
  height?: number | string;
  width?: number | string;
  fill?: string;
  color?: string;
  stroke?: string;
  as?: React.ElementType;
  className?: string;
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
      stroke = 'currentColor',
      as: AsComp,
      ...props
    },
    ref
  ) => {
    const sizeProps = useMemo(() => {
      if (height && width) return { height, width };
      if (height) return { height };
      if (width) return { width };
      return {};
    }, [height, width]);

    let colorProps = {};
    if (color) {
      colorProps = { ...colorProps, color: color };
    }
    if (stroke) {
      colorProps = { ...colorProps, stroke: stroke };
    }
    if (fill) {
      colorProps = { ...colorProps, fill: fill };
    }
    if (AsComp) {
      return <AsComp ref={ref} {...sizeProps} {...colorProps} {...props} />;
    }
    return (
      <Svg ref={ref} height={height} width={width} {...colorProps} {...props} />
    );
  }
);

const formControlStyle = tva({
  base: 'flex flex-col w-full',
});

const formControlErrorIconStyle = tva({
  base: 'text-error-700 fill-none',
});

const formControlErrorStyle = tva({
  base: 'flex flex-row justify-start items-center mt-1 gap-1',
});

const formControlErrorTextStyle = tva({
  base: 'text-error-700',
});

const formControlHelperStyle = tva({
  base: 'flex flex-row justify-start items-center mt-1',
});

const formControlHelperTextStyle = tva({
  base: 'text-typography-500',
});

const formControlLabelStyle = tva({
  base: 'flex flex-row justify-start items-center mb-1',
});

const formControlLabelTextStyle = tva({
  base: 'font-medium text-base tracking-md text-beige',
});

const formControlLabelAstrickStyle = tva({
  base: 'font-medium text-typography-900',
});

type IFormControlLabelAstrickProps = React.ComponentPropsWithoutRef<
  typeof Text
> &
  VariantProps<typeof formControlLabelAstrickStyle>;

const FormControlLabelAstrick = React.forwardRef<
  React.ElementRef<typeof Text>,
  IFormControlLabelAstrickProps
>(({ className, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={formControlLabelAstrickStyle({
        class: className,
      })}
      {...props}
    />
  );
});

export const UIFormControl = createFormControl({
  Root: withStyleContext(View, SCOPE),
  Error: View,
  ErrorText: Text,
  ErrorIcon: PrimitiveIcon,
  Label: View,
  LabelText: Text,
  LabelAstrick: FormControlLabelAstrick,
  Helper: View,
  HelperText: Text,
});

cssInterop(UIFormControl, { className: 'style' });
cssInterop(UIFormControl.Error, { className: 'style' });
cssInterop(UIFormControl.Error.Text, { className: 'style' });
cssInterop(UIFormControl.Label, { className: 'style' });
cssInterop(UIFormControl.Label.Text, { className: 'style' });
cssInterop(UIFormControl.Helper, { className: 'style' });
cssInterop(UIFormControl.Helper.Text, { className: 'style' });
cssInterop(UIFormControl.Error.Icon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      // @ts-ignore
      fill: true,
      color: true,
      stroke: true,
    },
  },
});

type IFormControlProps = React.ComponentProps<typeof UIFormControl> &
  VariantProps<typeof formControlStyle>;

const FormControl = React.forwardRef<
  React.ElementRef<typeof UIFormControl>,
  IFormControlProps
>(({ className, ...props }, ref) => {
  return (
    <UIFormControl
      ref={ref}
      className={formControlStyle({ class: className })}
      {...props}
    />
  );
});

type IFormControlErrorProps = React.ComponentProps<typeof UIFormControl.Error> &
  VariantProps<typeof formControlErrorStyle>;

const FormControlError = React.forwardRef<
  React.ElementRef<typeof UIFormControl.Error>,
  IFormControlErrorProps
>(({ className, ...props }, ref) => {
  return (
    <UIFormControl.Error
      ref={ref}
      className={formControlErrorStyle({ class: className })}
      {...props}
    />
  );
});

type IFormControlErrorTextProps = React.ComponentProps<
  typeof UIFormControl.Error.Text
> &
  VariantProps<typeof formControlErrorTextStyle>;

const FormControlErrorText = React.forwardRef<
  React.ElementRef<typeof UIFormControl.Error.Text>,
  IFormControlErrorTextProps
>(({ className, ...props }, ref) => {
  return (
    <UIFormControl.Error.Text
      className={formControlErrorTextStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  );
});

type IFormControlErrorIconProps = React.ComponentProps<
  typeof UIFormControl.Error.Icon
> &
  VariantProps<typeof formControlErrorIconStyle>;
const FormControlErrorIcon = React.forwardRef<
  React.ElementRef<typeof UIFormControl.Error.Icon>,
  IFormControlErrorIconProps
>(({ className, ...props }, ref) => {

  return (
    <UIFormControl.Error.Icon
      className={formControlErrorIconStyle({
        class: className,
      })}
      {...props}
    />
  );
});

type IFormControlLabelProps = React.ComponentProps<typeof UIFormControl.Label> &
  VariantProps<typeof formControlLabelStyle>;

const FormControlLabel = React.forwardRef<
  React.ElementRef<typeof UIFormControl.Label>,
  IFormControlLabelProps
>(({ className, ...props }, ref) => {
  return (
    <UIFormControl.Label
      ref={ref}
      className={formControlLabelStyle({ class: className })}
      {...props}
    />
  );
});

type IFormControlLabelTextProps = React.ComponentProps<
  typeof UIFormControl.Label.Text
> &
  VariantProps<typeof formControlLabelTextStyle>;

const FormControlLabelText = React.forwardRef<
  React.ElementRef<typeof UIFormControl.Label.Text>,
  IFormControlLabelTextProps
>(({ className, ...props }, ref) => {
  return (
    <UIFormControl.Label.Text
      className={formControlLabelTextStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  );
});

type IFormControlHelperProps = React.ComponentProps<
  typeof UIFormControl.Helper
> &
  VariantProps<typeof formControlHelperStyle>;

const FormControlHelper = React.forwardRef<
  React.ElementRef<typeof UIFormControl.Helper>,
  IFormControlHelperProps
>(({ className, ...props }, ref) => {
  return (
    <UIFormControl.Helper
      ref={ref}
      className={formControlHelperStyle({
        class: className,
      })}
      {...props}
    />
  );
});

type IFormControlHelperTextProps = React.ComponentProps<
  typeof UIFormControl.Helper.Text
> &
  VariantProps<typeof formControlHelperTextStyle>;

const FormControlHelperText = React.forwardRef<
  React.ElementRef<typeof UIFormControl.Helper.Text>,
  IFormControlHelperTextProps
>(({ className, ...props }, ref) => {

  return (
    <UIFormControl.Helper.Text
      className={formControlHelperTextStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  );
});

FormControl.displayName = 'FormControl';
FormControlError.displayName = 'FormControlError';
FormControlErrorText.displayName = 'FormControlErrorText';
FormControlErrorIcon.displayName = 'FormControlErrorIcon';
FormControlLabel.displayName = 'FormControlLabel';
FormControlLabelText.displayName = 'FormControlLabelText';
FormControlLabelAstrick.displayName = 'FormControlLabelAstrick';
FormControlHelper.displayName = 'FormControlHelper';
FormControlHelperText.displayName = 'FormControlHelperText';

export {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlLabelAstrick,
  FormControlHelper,
  FormControlHelperText,
};
