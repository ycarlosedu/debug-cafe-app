import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { FlatList } from 'react-native';

import { Container } from '@/components/Container';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
} from '@/components/ui/accordion';
import { ORDER_STATUS } from '@/constants';
import { orders } from '@/mocks/orders';
import colors from '@/styles/colors';

const ORDER_STATUS_LABEL = {
  [ORDER_STATUS.PENDING]: 'Pendente',
  [ORDER_STATUS.IN_PREPARATION]: 'Em preparação',
  [ORDER_STATUS.ON_THE_WAY]: 'A caminho',
  [ORDER_STATUS.DELIVERED]: 'Entregue',
  [ORDER_STATUS.CANCELED]: 'Cancelado',
};

const ORDER_STATUS_ICON = {
  [ORDER_STATUS.PENDING]: 'clock',
  [ORDER_STATUS.IN_PREPARATION]: 'utensils',
  [ORDER_STATUS.ON_THE_WAY]: 'truck',
  [ORDER_STATUS.DELIVERED]: 'check',
  [ORDER_STATUS.CANCELED]: 'xmark',
};

const ORDER_STATUS_COLOR = {
  [ORDER_STATUS.PENDING]: 'orange',
  [ORDER_STATUS.IN_PREPARATION]: 'yellow',
  [ORDER_STATUS.ON_THE_WAY]: 'blue',
  [ORDER_STATUS.DELIVERED]: 'green',
  [ORDER_STATUS.CANCELED]: 'red',
};

// TODO: QUANTIDADE DE CADA ITEM NO PEDIDO

export default function Orders() {
  return (
    <>
      <Stack.Screen options={{ title: 'Meus Pedidos' }} />
      <Container className="px-4">
        <Accordion
          size="lg"
          variant="filled"
          type="single"
          isCollapsible
          className="w-full bg-transparent">
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AccordionItem value={item.id.toString()} className="mt-6 rounded-lg bg-beige">
                <AccordionHeader>
                  <AccordionTrigger className="gap-4">
                    {({ isExpanded }) => {
                      return (
                        <>
                          <AccordionTitleText className="flex flex-row items-center text-brown">
                            {item.date} - {ORDER_STATUS_LABEL[item.status]}{' '}
                          </AccordionTitleText>
                          <FontAwesome6
                            size={16}
                            color={colors.brown}
                            name={ORDER_STATUS_ICON[item.status]}
                          />
                          <FontAwesome
                            size={16}
                            color={ORDER_STATUS_COLOR[item.status]}
                            name="circle"
                          />
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
                  {item.products.map((product) => (
                    <AccordionContentText key={product.id} className="text-white">
                      x{product.quantity} {product.name}
                    </AccordionContentText>
                  ))}
                  {item.stars && (
                    <AccordionContentText className="text-brown">
                      Avaliação - {item.stars} estrelas
                    </AccordionContentText>
                  )}
                  <Link
                    href={{
                      pathname: '/order/[id]',
                      params: { id: item.id.toString() },
                    }}
                    className="flex flex-row items-center justify-center gap-1 rounded-lg bg-brown px-2 py-3">
                    <AccordionContentText className="text-center text-beige">
                      Ver Mais detalhes
                    </AccordionContentText>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            )}
          />
        </Accordion>
      </Container>
    </>
  );
}
