import { StyleSheet, FlatList, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { mockMatches, Match } from '@/constants/Matches';
import { formatDistanceToNowStrict } from 'date-fns';

export default function MatchesScreen() {
  const renderMatchItem = ({ item }: { item: Match }) => {
    const otherUserId = item.users.find(id => id !== 'uid1');
    const otherUser = otherUserId ? item.userMap[otherUserId] : null;

    if (!otherUser) {
      return null;
    }

    const timeAgo = formatDistanceToNowStrict(new Date(item.lastMessageTime), { addSuffix: true });

    return (
      <View style={styles.matchCard}>
        <Image source={{ uri: otherUser.avatar }} style={styles.matchImage} />
        <View style={styles.matchInfo}>
          <Text style={styles.matchName}>{otherUser.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          <Text style={styles.lastMessageTime}>{timeAgo}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Matches</Text>
      {mockMatches.length > 0 ? (
        <FlatList
          data={mockMatches}
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
    padding: 10,
  },
  matchImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  matchInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    alignSelf: 'flex-end',
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
