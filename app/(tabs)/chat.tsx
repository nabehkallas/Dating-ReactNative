// app/(tabs)/chat.tsx
import StoriesRail from '@/components/stories/StoriesRail';
import { subscribeToInbox } from '@/services/ChatService';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const navigation = useNavigation<any>();
  const currentUserId = 'user_1'; // Hardcoded ID for now

  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. REAL-TIME INBOX LISTENER
  useEffect(() => {
    const unsubscribe = subscribeToInbox(currentUserId, (data) => {
      const formattedData = data.map(chat => ({
        ...chat,
        time: timeAgo(chat.timestamp) 
      }));
      
      setChats(formattedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const timeAgo = (date: Date) => {
    if (!date) return '';
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'now';
    if (seconds < 3600) return Math.floor(seconds/60) + 'm';
    if (seconds < 86400) return Math.floor(seconds/3600) + 'h';
    return Math.floor(seconds/86400) + 'd';
  };

  const handlePressChat = (item: any) => {
    navigation.navigate('chat_room', { 
      matchId: item.id,
      userId: currentUserId,
      userName: 'Me',
      otherUserName: item.name,
      otherUserAvatar: item.avatar
    });
  };

  const renderChatItem = ({ item }: any) => (
    <TouchableOpacity style={styles.chatRow} onPress={() => handlePressChat(item)}>
      <Image 
        source={{ uri: item.avatar || 'https://placehold.co/150' }} 
        style={styles.chatAvatar} 
      />
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      <View>
        <StoriesRail currentUserId={currentUserId} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fe3c72" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No matches yet.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: { fontSize: 34, fontWeight: 'bold', color: '#000' },
  listContent: { paddingBottom: 20 },
  chatRow: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  chatAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee' },
  chatContent: { flex: 1, marginLeft: 15 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  chatName: { fontSize: 16, fontWeight: '600', color: '#000' },
  chatTime: { fontSize: 12, color: '#999' },
  chatMessage: { fontSize: 14, color: '#666' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 }
});