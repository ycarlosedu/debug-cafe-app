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

export default function SelectedPayment() {
  return (
    <View className="gap-2">
      <Text className="text-base text-beige">Pagamento</Text>
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
                      Cartão Visa 6040
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
              Selecione o meio desejado:
            </AccordionContentText>
            <AccordionContentText className="text-white">Pix</AccordionContentText>
            <AccordionContentText className="text-white">Cartão Visa 6040</AccordionContentText>
            <AccordionContentText className="text-white">Cartão Master 8050</AccordionContentText>
            <Link
              href={{
                pathname: '/order/[id]',
                params: { id: 1 },
              }}
              className="flex flex-row items-center justify-center gap-1 rounded-lg bg-brown px-2 py-3">
              <AccordionContentText className="text-center text-beige">
                Adicionar Cartão
              </AccordionContentText>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
