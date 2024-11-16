import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

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

export default function SelectedAddress() {
  return (
    <View className="gap-2">
      <Text className="text-base text-beige">Endereço</Text>
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
                      Rua XXXXXXX
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
            <AccordionContentText className="text-brown">CEP 99999-999</AccordionContentText>
            <AccordionContentText className="text-brown">Porto Alegre</AccordionContentText>
            <AccordionContentText className="text-brown">Número 999</AccordionContentText>
            <Link
              href={{
                pathname: '/order/[id]',
                params: { id: 1 },
              }}
              className="flex flex-row items-center justify-center gap-1 rounded-lg bg-brown px-2 py-3">
              <AccordionContentText className="text-center text-beige">
                Alterar Endereço
              </AccordionContentText>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
