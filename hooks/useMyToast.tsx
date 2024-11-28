import { InterfaceToastProps } from '@gluestack-ui/toast/lib/types';
import { useState } from 'react';

import { Toast, TOAST_ACTION, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';

type ShowToastProps = Pick<
  InterfaceToastProps,
  'duration' | 'placement' | 'onCloseComplete' | 'avoidKeyboard'
> & {
  title: string;
  message: string;
  action: TOAST_ACTION;
};

export function useMyToast() {
  const toast = useToast();
  const [toastId, setToastId] = useState('');

  const showToast = (toastOptions: ShowToastProps) => {
    if (!toast.isActive(toastId)) {
      showNewToast(toastOptions);
    }
  };

  const showNewToast = ({ title, message, action, ...toastOptions }: ShowToastProps) => {
    const newId = Math.random().toString();
    setToastId(newId);
    toast.show({
      ...toastOptions,
      id: newId,
      placement: toastOptions.placement || 'top right',
      duration: toastOptions.duration || 3000,
      render: ({ id }) => {
        const uniqueToastId = 'toast-' + id;
        return (
          <Toast nativeID={uniqueToastId} action={action} variant="solid">
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{message}</ToastDescription>
          </Toast>
        );
      },
    });
  };

  return {
    showToast,
  };
}
