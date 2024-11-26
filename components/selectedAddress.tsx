import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { AddressFormValues } from './forms/address-form';
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from './ui/accordion';

import colors from '@/styles/colors';
import { applyMask, REGEX } from '@/utils/regex';

type Props = {
  address?: AddressFormValues;
};

export default function SelectedAddress({ address }: Props) {
  return (
    <View className="gap-2">
      <Text className="text-base text-beige">Endereço</Text>
      {!address && (
        <Link
          href="/edit-address"
          className="flex flex-row items-center justify-center gap-1 rounded-lg bg-beige px-2 py-3">
          <Text className="text-center text-lg font-normal text-brown">Adicionar Endereço</Text>
        </Link>
      )}

      {address && (
        <Accordion
          size="lg"
          variant="filled"
          type="single"
          isCollapsible
          className="w-full bg-transparent">
          <AccordionItem value="address" className="rounded-lg bg-beige">
            <AccordionHeader>
              <AccordionTrigger className="gap-4">
                {({ isExpanded }) => {
                  return (
                    <>
                      <AccordionTitleText className="flex flex-row items-center text-brown">
                        {address.street}
                      </AccordionTitleText>
                      {isExpanded ? (
                        <FontAwesome color={colors.brown} name="caret-up" size={24} />
                      ) : (
                        <FontAwesome color={colors.brown} name="caret-down" size={24} />
                      )}
                    </>
                  );
                }}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent className="flex flex-col gap-5">
              <AccordionContentText className="text-brown">
                CEP {applyMask(address.cep, REGEX.CEP)}
              </AccordionContentText>
              <AccordionContentText className="text-brown">{address.city}</AccordionContentText>
              <AccordionContentText className="text-brown">
                Número {address.number}
              </AccordionContentText>
              <Link
                href="/edit-address"
                className="flex flex-row items-center justify-center gap-1 rounded-lg bg-brown px-2 py-3">
                <AccordionContentText className="text-center text-beige">
                  Alterar Endereço
                </AccordionContentText>
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </View>
  );
}
