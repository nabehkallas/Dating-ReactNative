import { User, mockUsers } from './Users';

export interface Story {
  id: string;
  createdAt: number; // Timestamp
  expiresAt: number; // Timestamp
  imageUrl: string;
  userId: string; // ID of the user who posted the story
  viewers: string[]; // Array of user IDs who have viewed the story
}

export const mockStories: Story[] = [
  {
    id: 'story1',
    createdAt: Date.now() - 3600000, // 1 hour ago
    expiresAt: Date.now() + 20 * 3600000, // Expires in 20 hours
    imageUrl: 'https://via.placeholder.com/600/FF5733/FFFFFF?text=Story1',
    userId: 'uid1', // Sarah's story
    viewers: ['uid2', 'uid3'],
  },
  {
    id: 'story2',
    createdAt: Date.now() - 7200000, // 2 hours ago
    expiresAt: Date.now() + 19 * 3600000, // Expires in 19 hours
    imageUrl: 'https://via.placeholder.com/600/33FF57/FFFFFF?text=Story2',
    userId: 'uid2', // John's story
    viewers: ['uid1', 'uid3', 'uid4'],
  },
  {
    id: 'story3',
    createdAt: Date.now() - 10800000, // 3 hours ago
    expiresAt: Date.now() + 18 * 3600000, // Expires in 18 hours
    imageUrl: 'https://via.placeholder.com/600/3357FF/FFFFFF?text=Story3',
    userId: 'uid3', // Emily's story
    viewers: ['uid1', 'uid2'],
  },
];
