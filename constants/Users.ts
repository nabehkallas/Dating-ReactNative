export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  imageUrl: string;
  location: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 24,
    bio: 'Hiker & Coffee lover',
    imageUrl: 'https://via.placeholder.com/400',
    location: 'New York',
  },
  {
    id: '2',
    name: 'John',
    age: 28,
    bio: 'Software Engineer & Gamer',
    imageUrl: 'https://via.placeholder.com/400',
    location: 'San Francisco',
  },
  {
    id: '3',
    name: 'Emily',
    age: 22,
    bio: 'Artist & Cat enthusiast',
    imageUrl: 'https://via.placeholder.com/400',
    location: 'Los Angeles',
  },
  {
    id: '4',
    name: 'Michael',
    age: 30,
    bio: 'Chef & Foodie',
    imageUrl: 'https://via.placeholder.com/400',
    location: 'Chicago',
  },
  {
    id: '5',
    name: 'Jessica',
    age: 26,
    bio: 'Traveler & Photographer',
    imageUrl: 'https://via.placeholder.com/400',
    location: 'Miami',
  },
];
