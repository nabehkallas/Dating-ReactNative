import { StyleSheet, FlatList, Image } from 'react-native';

import { Text, View } from '@/components/Themed';
import { mockUsers, User } from '@/constants/Users';

export default function MatchesScreen() {
  const renderMatchItem = ({ item }: { item: User }) => (
    <View style={styles.matchCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.matchImage} />
      <View style={styles.matchInfo}>
        <Text style={styles.matchName}>{item.name}, {item.age}</Text>
        <Text style={styles.matchBio}>{item.bio}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Matches</Text>
      {mockUsers.length > 0 ? (
        <FlatList
          data={mockUsers}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.noMatchesContainer}>
          <Text style={styles.noMatchesText}>No matches yet. Keep swiping!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#333',
  },
  listContainer: {
    width: '100%',
  },
  matchCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  matchImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  matchInfo: {
    padding: 15,
    justifyContent: 'center',
    flex: 1,
  },
  matchName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  matchBio: {
    fontSize: 14,
    color: '#666',
  },
  noMatchesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMatchesText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});
