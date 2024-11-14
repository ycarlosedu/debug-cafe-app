import { FontAwesome } from '@expo/vector-icons';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  return <FontAwesome size={28} {...props} />;
};
