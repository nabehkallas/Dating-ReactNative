import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { mockUsers } from '@/constants/Users';
import Card from '@/components/Card';

export default function HomeScreen() {
  const currentUser = mockUsers[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipe</Text>
      {currentUser && <Card user={currentUser} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
