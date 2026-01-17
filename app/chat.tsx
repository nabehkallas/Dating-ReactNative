import { StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { mockMatches, Message } from '@/constants/Matches';
import { mockStories, Story } from '@/constants/Stories'; // Import mockStories and Story interface
import { mockUsers } from '@/constants/Users'; // Import mockUsers to get user info for stories
import { format } from 'date-fns'; // For formatting timestamp

export default function ChatScreen() {
  // For demonstration, let's pick the first match's messages
  const currentMatch = mockMatches[0];

  if (!currentMatch) {
    return (
      <View style={styles.fullContainer}>
        <Text style={styles.title}>No Chat Selected</Text>
      </View>
    );
  }

  const renderMessage = ({ item }: { item: Message }) => {
    // Assuming current user is 'uid1' for styling purposes
    const isMyMessage = item.senderId === 'uid1';
    const messageTime = format(new Date(item.timestamp), 'p'); // 'p' for short time (e.g., 4:30 PM)

    return (
      <View style={[styles.messageBubble, isMyMessage ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{messageTime}</Text>
      </View>
    );
  };

  const renderStoryItem = ({ item }: { item: Story }) => {
    const storyUser = mockUsers.find(user => user.uid === item.userId);
    return (
      <View style={styles.storyItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.storyImage} />
        <Text style={styles.storyUserName}>{storyUser?.name || 'Unknown'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.fullContainer}>
      {/* Stories Section */}
      <View style={styles.storiesContainer}>
        <FlatList
          data={mockStories}
          renderItem={renderStoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesList}
        />
      </View>

      {/* Chat Section */}
      <View style={styles.chatContainer}>
        <Text style={styles.title}>Chat with {currentMatch.userMap[currentMatch.users.find(id => id !== 'uid1') || '']?.name}</Text>
        <FlatList
          data={currentMatch.messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()} // Using index as key for simplicity, ideally use a unique message ID
          contentContainerStyle={styles.messagesList}
          inverted // To show latest messages at the bottom
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  storiesContainer: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  storiesList: {
    paddingHorizontal: 10,
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FF4B6E',
  },
  storyUserName: {
    fontSize: 12,
    marginTop: 5,
    color: '#555',
  },
  chatContainer: {
    flex: 1,
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