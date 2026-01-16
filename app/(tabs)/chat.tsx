import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { mockMatches, Message } from '@/constants/Matches';
import { format } from 'date-fns'; // For formatting timestamp

export default function ChatScreen() {
  // For demonstration, let's pick the first match's messages
  const currentMatch = mockMatches[0];

  if (!currentMatch) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Chat Selected</Text>
      </View>
    );
  }

  const renderMessage = ({ item }: { item: Message }) => {
    // Assuming current user is '1' for styling purposes
    const isMyMessage = item.senderId === '1';
    const messageTime = format(new Date(item.timestamp), 'p'); // 'p' for short time (e.g., 4:30 PM)

    return (
      <View style={[styles.messageBubble, isMyMessage ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{messageTime}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {currentMatch.userMap[currentMatch.users.find(id => id !== '1') || '']?.name}</Text>
      <FlatList
        data={currentMatch.messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()} // Using index as key for simplicity, ideally use a unique message ID
        contentContainerStyle={styles.messagesList}
        inverted // To show latest messages at the bottom
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  messagesList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'column',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6', // Light green for my messages
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF', // White for other messages
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  messageTime: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});
