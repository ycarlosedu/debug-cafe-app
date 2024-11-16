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
import { Radio, RadioGroup, RadioIndicator, RadioLabel } from './ui/radio';

import { creditCards } from '@/mocks/credit-cards';
import colors from '@/styles/colors';

type Props = {
  selectedPayment: string;
  onChangePayment: (payment: string) => void;
};

export default function SelectedPayment({ selectedPayment, onChangePayment }: Props) {
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
                      {selectedPayment}
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
            <RadioGroup value={selectedPayment} onChange={(e) => onChangePayment(e)}>
              <Radio value="Pix" size="lg">
                <RadioIndicator>
                  {selectedPayment === 'Pix' && <FontAwesome name="circle" size={16} />}
                </RadioIndicator>
                <RadioLabel>Pix</RadioLabel>
              </Radio>
              {creditCards.map((card) => (
                <Radio key={card.id} value={card.name} size="lg">
                  <RadioIndicator>
                    {selectedPayment === card.name && <FontAwesome name="circle" size={16} />}
                  </RadioIndicator>
                  <RadioLabel>{card.name}</RadioLabel>
                </Radio>
              ))}
            </RadioGroup>
            <Link
              href="/add-credit-card"
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
