// app/chat_room.tsx
import { sendMessage, subscribeToMessages } from '@/services/ChatService';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send
} from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';

type ParamList = {
  ChatRoom: {
    matchId: string;
    userId: string; 
    userName: string;
    otherUserName: string;
    otherUserAvatar: string;
  };
};

export default function ChatRoomScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'ChatRoom'>>();
  
 
  const params = route.params || {};
  const { 
    matchId, 
    userId = '4BKr6lVknOESsJ97N7x8XGPv9XHR', // Fallback ID
    userName = 'Me', 
    otherUserName = 'Chat', 
    otherUserAvatar 
  } = params;

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. REAL-TIME LISTENER
  useEffect(() => {
    if (!matchId) return;

    const unsubscribe = subscribeToMessages(matchId, (newMessages) => {
      const formatted = newMessages.map((msg) => ({
        ...msg,
        user: {
          _id: msg.user._id,
          name: msg.user._id === userId ? userName : otherUserName,
          avatar: (msg.user._id !== userId) 
            ? (otherUserAvatar || 'https://placehold.co/100x100/png') 
            : undefined,
        }
      }));
      
      setMessages(formatted);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [matchId, userId, userName, otherUserName, otherUserAvatar]);

 
  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    
    const msg = newMessages[0];
    try {
      if (matchId && userId) {
        await sendMessage(userId, matchId, msg.text);
      }
    } catch (e) {
      console.error("Failed to send", e);
    }
  }, [matchId, userId]);

 
  const renderInputToolbar = useCallback((props: any) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={{ alignItems: 'center' }}
    />
  ), []);

  const renderSend = useCallback((props: any) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Ionicons name="arrow-up" size={20} color="#fff" />
      </View>
    </Send>
  ), []);

  const renderBubble = useCallback((props: any) => (
    <Bubble {...props} 
      wrapperStyle={{
        right: { backgroundColor: '#fe3c72' },
        left: { backgroundColor: '#ffffff' }
      }} 
      textStyle={{
        right: { color: '#ffffff' },
        left: { color: '#333333' }
      }}
    />
  ), []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fe3c72" />
        </TouchableOpacity>
        
        {otherUserAvatar && (
          <Image source={{ uri: otherUserAvatar }} style={styles.headerAvatar} />
        )}
        
        <Text style={styles.headerTitle}>{otherUserName}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fe3c72" style={{ marginTop: 20 }} />
      ) : (
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} 
        >
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{ _id: userId }}
            showAvatarForEveryMessage={true}
            alwaysShowSend
            textInputStyle={styles.textInput}
            placeholder="Type a message..."
            textInputProps={{
              placeholderTextColor: '#999',
              keyboardAppearance: 'light',
              style: { color: '#000000' }
            }}
            renderInputToolbar={renderInputToolbar}
            renderSend={renderSend}
            renderBubble={renderBubble}
          />
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    height: 60,
  },
  backButton: { marginRight: 10, padding: 5 },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: '#eee'
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  inputToolbar: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  textInput: {
    color: '#000',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10, 
    paddingBottom: 10,
    marginTop: 6,
    marginRight: 10,
    marginLeft: 0,
    fontSize: 16,
    lineHeight: 20,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#fe3c72',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
  }
});