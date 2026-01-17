
export interface Preferences {
  distance: number; // in km
  maxAge: number;
  minAge: number;
  gender: 'male' | 'female' | 'other' | 'all';
}

export interface User {
  id: string;
  uid: string;
  name: string;
  age: number;
  bio: string;
  profileImage: string;
  gallery: string[];
  location: {
    latitude: number;
    longitude: number;
  } | string;
  
  gender: 'male' | 'female' | 'other';
  isVerified: boolean;
  fcmTokens?: string[];
  BlockedUserIds?: string[];
  preferences?: Preferences; // User's preferences for matching
}

export const mockUsers: User[] = [
  {
    id: '1',
    uid: 'uid1',
    name: 'Sarah',
    age: 24,
    bio: 'Hiker & Coffee lover',
    profileImage: 'https://via.placeholder.com/400/FF5733/FFFFFF?text=Sarah',
    gallery: ['https://via.placeholder.com/400/FF5733/FFFFFF?text=Sarah1', 'https://via.placeholder.com/400/FF5733/FFFFFF?text=Sarah2'],
    location: { latitude: 40.7128, longitude: -74.0060 },
    gender: 'female',
    isVerified: true,
    fcmTokens: ['token1'],
    preferences: {
      distance: 50,
      maxAge: 30,
      minAge: 20,
      gender: 'male',
    },
  },
  {
    id: '2',
    uid: 'uid2',
    name: 'John',
    age: 28,
    bio: 'Software Engineer & Gamer',
    profileImage: 'https://via.placeholder.com/400/33FF57/FFFFFF?text=John',
    gallery: ['https://via.placeholder.com/400/33FF57/FFFFFF?text=John1', 'https://via.placeholder.com/400/33FF57/FFFFFF?text=John2'],
    location: 'San Francisco',
    gender: 'male',
    isVerified: false,
    fcmTokens: ['token2'],
    preferences: {
      distance: 100,
      maxAge: 35,
      minAge: 25,
      gender: 'female',
    },
  },
  {
    id: '3',
    uid: 'uid3',
    name: 'Emily',
    age: 22,
    bio: 'Artist & Cat enthusiast',
    profileImage: 'https://via.placeholder.com/400/3357FF/FFFFFF?text=Emily',
    gallery: ['https://via.placeholder.com/400/3357FF/FFFFFF?text=Emily1', 'https://via.placeholder.com/400/3357FF/FFFFFF?text=Emily2'],
    location: { latitude: 34.0522, longitude: -118.2437 },
    gender: 'female',
    isVerified: true,
    fcmTokens: ['token3'],
    preferences: {
      distance: 25,
      maxAge: 28,
      minAge: 20,
      gender: 'all',
    },
  },
  {
    id: '4',
    uid: 'uid4',
    name: 'Michael',
    age: 30,
    bio: 'Chef & Foodie',
    profileImage: 'https://via.placeholder.com/400/FF33A1/FFFFFF?text=Michael',
    gallery: ['https://via.placeholder.com/400/FF33A1/FFFFFF?text=Michael1', 'https://via.placeholder.com/400/FF33A1/FFFFFF?text=Michael2'],
    location: 'Chicago',
    gender: 'male',
    isVerified: true,
    fcmTokens: ['token4'],
    preferences: {
      distance: 75,
      maxAge: 40,
      minAge: 28,
      gender: 'female',
    },
  },
  {
    id: '5',
    uid: 'uid5',
    name: 'Jessica',
    age: 26,
    bio: 'Traveler & Photographer',
    profileImage: 'https://via.placeholder.com/400/A133FF/FFFFFF?text=Jessica',
    gallery: ['https://via.placeholder.com/400/A133FF/FFFFFF?text=Jessica1', 'https://via.placeholder.com/400/A133FF/FFFFFF?text=Jessica2'],
    location: { latitude: 25.7617, longitude: -80.1918 },
    gender: 'female',
    isVerified: false,
    fcmTokens: ['token5'],
    preferences: {
      distance: 60,
      maxAge: 32,
      minAge: 24,
      gender: 'male',
    },
  },
];
