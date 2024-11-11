'use client';
import { createFormControl } from '@gluestack-ui/form-control';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { cssInterop } from 'nativewind';
import React from 'react';
import { Text, View } from 'react-native';

const formControlStyle = tva({
  base: 'flex w-full flex-col',
});

const formControlErrorTextStyle = tva({
  base: 'mt-2 text-error-950',
});

const formControlHelperStyle = tva({
  base: 'mt-1 flex flex-row items-center justify-start',
});

const formControlHelperTextStyle = tva({
  base: 'text-typography-500',
});

const formControlLabelStyle = tva({
  base: 'mb-1 flex flex-row items-center justify-start',
});

const formControlLabelTextStyle = tva({
  base: 'tracking-md text-base font-medium text-beige',
});

const formControlLabelAstrickStyle = tva({
  base: 'font-medium text-typography-900',
});

type IFormControlLabelAstrickProps = React.ComponentPropsWithoutRef<typeof Text> &
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
  Root: View,
  Error: () => null,
  ErrorText: Text,
  ErrorIcon: () => null,
  Label: View,
  LabelText: Text,
  LabelAstrick: FormControlLabelAstrick,
  Helper: View,
  HelperText: Text,
});

cssInterop(UIFormControl, { className: 'style' });
cssInterop(UIFormControl.Error.Text, { className: 'style' });
cssInterop(UIFormControl.Label, { className: 'style' });
cssInterop(UIFormControl.Label.Text, { className: 'style' });
cssInterop(UIFormControl.Helper, { className: 'style' });
cssInterop(UIFormControl.Helper.Text, { className: 'style' });

type IFormControlProps = React.ComponentProps<typeof UIFormControl> &
  VariantProps<typeof formControlStyle>;

const FormControl = React.forwardRef<React.ElementRef<typeof UIFormControl>, IFormControlProps>(
  ({ className, ...props }, ref) => {
    return (
      <UIFormControl ref={ref} className={formControlStyle({ class: className })} {...props} />
    );
  }
);

type IFormControlErrorTextProps = React.ComponentProps<typeof UIFormControl.Error.Text> &
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

type IFormControlLabelTextProps = React.ComponentProps<typeof UIFormControl.Label.Text> &
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

type IFormControlHelperProps = React.ComponentProps<typeof UIFormControl.Helper> &
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

type IFormControlHelperTextProps = React.ComponentProps<typeof UIFormControl.Helper.Text> &
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
FormControlErrorText.displayName = 'FormControlErrorText';
FormControlLabel.displayName = 'FormControlLabel';
FormControlLabelText.displayName = 'FormControlLabelText';
FormControlLabelAstrick.displayName = 'FormControlLabelAstrick';
FormControlHelper.displayName = 'FormControlHelper';
FormControlHelperText.displayName = 'FormControlHelperText';

export {
  FormControl,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  FormControlLabelAstrick,
  FormControlHelper,
  FormControlHelperText,
};
