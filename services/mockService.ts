import { mockUsers, User } from '@/constants/Users';

export const fetchMockUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 500); // Simulate network delay
  });
};
