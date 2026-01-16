export interface User {
  id: string; // Maps to document ID
  uid: string; // Maps to "UID" field
  name: string;
  age: number;
  bio: string;
  profileImage: string; // Main avatar
  
  // ✅ ADDED: The Gallery you wanted
  gallery: string[]; 
  
  // ✅ FIXED: Location is not just a string in your DB
  location: {
    latitude: number;
    longitude: number;
  } | string; // Allow string if you reverse-geocode it later
  
  gender: 'male' | 'female' | 'other';
  isVerified: boolean;
  
  // Optional: Good for "Online" status later
  fcmTokens?: string[]; 
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
  },
  {
    id: '2',
    uid: 'uid2',
    name: 'John',
    age: 28,
    bio: 'Software Engineer & Gamer',
    profileImage: 'https://via.placeholder.com/400/33FF57/FFFFFF?text=John',
    gallery: ['https://via.placeholder.com/400/33FF57/FFFFFF?text=John1', 'https://via.placeholder.com/400/33FF57/FFFFFF?text=John2'],
    location: 'San Francisco', // Example of string location
    gender: 'male',
    isVerified: false,
    fcmTokens: ['token2'],
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
  },
];
