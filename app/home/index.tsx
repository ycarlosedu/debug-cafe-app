import { Link, Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { HeaderButton } from '~/components/HeaderButton';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/home/index.tsx" title="Home" />
      </Container>
      <Link href="/modal" asChild>
        <HeaderButton />
      </Link>
    </>
  );
}
