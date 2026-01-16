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
  seenBy: string[]; // Array of user UIDs who have seen the last message
  userMap: { [key: string]: { avatar: string; name: string } };
  users: string[]; // Array of user UIDs involved in the match
  messages: Message[]; // Simulating a sub-collection of messages
}

// Helper to create a userMap from mockUsers
const createUserMap = (userIds: string[]) => {
  const map: { [key: string]: { avatar: string; name: string } } = {};
  userIds.forEach(id => {
    const user = mockUsers.find(u => u.uid === id); // Use uid for lookup
    if (user) {
      map[id] = { avatar: user.profileImage, name: user.name }; // Use profileImage
    }
  });
  return map;
};

export const mockMatches: Match[] = [
  {
    id: 'match1',
    lastMessage: 'Hey Sarah, how are you?',
    lastMessageTime: Date.now() - 3600000, // 1 hour ago
    seenBy: ['uid1'], // Use uid
    userMap: createUserMap(['uid1', 'uid2']), // Sarah and John
    users: ['uid1', 'uid2'],
    messages: [
      { senderId: 'uid1', text: 'Hi John!', timestamp: Date.now() - 7200000, type: 'text' },
      { senderId: 'uid2', text: 'Hey Sarah, how are you?', timestamp: Date.now() - 3600000, type: 'text' },
    ],
  },
  {
    id: 'match2',
    lastMessage: 'Let\'s grab coffee sometime!',
    lastMessageTime: Date.now() - 86400000, // 1 day ago
    seenBy: ['uid3', 'uid4'], // Use uid
    userMap: createUserMap(['uid3', 'uid4']), // Emily and Michael
    users: ['uid3', 'uid4'],
    messages: [
      { senderId: 'uid3', text: 'Hey Michael!', timestamp: Date.now() - 172800000, type: 'text' },
      { senderId: 'uid4', text: 'Let\'s grab coffee sometime!', timestamp: Date.now() - 86400000, type: 'text' },
    ],
  },
  {
    id: 'match3',
    lastMessage: 'Nice to meet you!',
    lastMessageTime: Date.now() - 2 * 86400000, // 2 days ago
    seenBy: ['uid5'], // Use uid
    userMap: createUserMap(['uid5', 'uid1']), // Jessica and Sarah
    users: ['uid5', 'uid1'],
    messages: [
      { senderId: 'uid5', text: 'Hi Sarah!', timestamp: Date.now() - 3 * 86400000, type: 'text' },
      { senderId: 'uid1', text: 'Nice to meet you!', timestamp: Date.now() - 2 * 86400000, type: 'text' },
    ],
  },
];
