import { InterfaceAlertDialogProps } from '@gluestack-ui/alert-dialog/lib/types';
import { Text } from 'react-native';

import { Button, ButtonText } from './button';

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
} from '@/components/ui/alert-dialog';
import useMenuStore, { MENU_STORE } from '@/stores/useMenuStore';

type Props = InterfaceAlertDialogProps & {
  handleSubmit: () => void;
  title: string;
  message?: string;
};

export default function ConfirmDeleteDialog({ title, message, handleSubmit, ...props }: Props) {
  const { isConfirmDeleteDialogOpen, handleChangeMenu } = useMenuStore();

  const handleClose = () => {
    handleChangeMenu(MENU_STORE.DELETE_DIALOG, false);
  };

  const startSubmit = () => {
    handleSubmit();
    handleClose();
  };

  return (
    <AlertDialog closeOnOverlayClick isOpen={isConfirmDeleteDialogOpen} {...props}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text className="text-center text-2xl font-semibold text-typography-950">{title}</Text>
        </AlertDialogHeader>
        <AlertDialogBody className="mb-4 mt-3">
          <Text className="text-center">{message}</Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <Button appearance="primary" onPress={handleClose} className="w-1/2">
            <ButtonText appearance="primary">Cancelar</ButtonText>
          </Button>
          <Button appearance="secondary" onPress={startSubmit} className="w-1/2">
            <ButtonText appearance="secondary">Confimar</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
