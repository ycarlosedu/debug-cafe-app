import { SafeAreaView } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className="bg-primary flex flex-1">{children}</SafeAreaView>;
};
