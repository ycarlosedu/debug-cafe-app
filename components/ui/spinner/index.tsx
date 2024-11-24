'use client';
import { VariantProps } from '@gluestack-ui/nativewind-utils';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { createSpinner } from '@gluestack-ui/spinner';
import { cssInterop } from 'nativewind';
import React from 'react';
import { ActivityIndicator } from 'react-native';

const UISpinner = createSpinner({ Root: ActivityIndicator });

cssInterop(UISpinner, {
  className: { target: 'style', nativeStyleToProp: { color: true } },
});

const spinnerStyle = tva({
  variants: {
    appearance: {
      primary: 'text-brown',
      secondary: 'text-beige',
    },
  },
});

type ISpinnerProps = React.ComponentProps<typeof UISpinner> & VariantProps<typeof spinnerStyle>;

const Spinner = React.forwardRef<React.ElementRef<typeof UISpinner>, ISpinnerProps>(
  ({ className, color, appearance, ...props }, ref) => {
    return (
      <UISpinner
        ref={ref}
        {...props}
        color={color}
        className={spinnerStyle({ class: className, appearance })}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
