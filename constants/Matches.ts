import { User, mockUsers } from './Users';

export interface Message {
  senderId: string;
  text: string;
  timestamp: number; // Using number for simplicity, can be Date or Firestore Timestamp
  type: 'text' | 'image' | 'video';
}

export interface Match {
  id: string;
  lastMessage: string;
  lastMessageTime: number; // Using number for simplicity, can be Date or Firestore Timestamp
  seenBy: string[]; // Array of user IDs who have seen the last message
  userMap: { [key: string]: { avatar: string; name: string } };
  users: string[]; // Array of user IDs involved in the match
  messages: Message[]; // Simulating a sub-collection of messages
}

// Helper to create a userMap from mockUsers
const createUserMap = (userIds: string[]) => {
  const map: { [key: string]: { avatar: string; name: string } } = {};
  userIds.forEach(id => {
    const user = mockUsers.find(u => u.id === id);
    if (user) {
      map[id] = { avatar: user.imageUrl, name: user.name };
    }
  });
  return map;
};

export const mockMatches: Match[] = [
  {
    id: 'match1',
    lastMessage: 'Hey Sarah, how are you?',
    lastMessageTime: Date.now() - 3600000, // 1 hour ago
    seenBy: ['user1'],
    userMap: createUserMap(['1', '2']), // Sarah and John
    users: ['1', '2'],
    messages: [
      { senderId: '1', text: 'Hi John!', timestamp: Date.now() - 7200000, type: 'text' },
      { senderId: '2', text: 'Hey Sarah, how are you?', timestamp: Date.now() - 3600000, type: 'text' },
    ],
  },
  {
    id: 'match2',
    lastMessage: 'Let\'s grab coffee sometime!',
    lastMessageTime: Date.now() - 86400000, // 1 day ago
    seenBy: ['user3', 'user4'],
    userMap: createUserMap(['3', '4']), // Emily and Michael
    users: ['3', '4'],
    messages: [
      { senderId: '3', text: 'Hey Michael!', timestamp: Date.now() - 172800000, type: 'text' },
      { senderId: '4', text: 'Let\'s grab coffee sometime!', timestamp: Date.now() - 86400000, type: 'text' },
    ],
  },
  {
    id: 'match3',
    lastMessage: 'Nice to meet you!',
    lastMessageTime: Date.now() - 2 * 86400000, // 2 days ago
    seenBy: ['user5'],
    userMap: createUserMap(['5', '1']), // Jessica and Sarah
    users: ['5', '1'],
    messages: [
      { senderId: '5', text: 'Hi Sarah!', timestamp: Date.now() - 3 * 86400000, type: 'text' },
      { senderId: '1', text: 'Nice to meet you!', timestamp: Date.now() - 2 * 86400000, type: 'text' },
    ],
  },
];
