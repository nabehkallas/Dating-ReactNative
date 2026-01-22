// src/services/MatchService.ts
import { submitSwipe } from './SwipeService';


const API_URL = 'http://172.20.10.3:8000/api'; 

export interface PendingLike {
  id: string; 
  name: string;
  age: number;
  avatar: string; 
  type: 'like' | 'super';
  isPrivate: boolean;
  timestamp: string;
}


export const fetchPendingLikes = async (userId: string): Promise<PendingLike[]> => {
  try {
    const response = await fetch(`${API_URL}/matches/pending?user_id=${userId}`);
    const json = await response.json();
    
const rawData = Array.isArray(json.data) ? json.data : [];


    return rawData.map((item: any) => ({

      id: item.id || item.uid || 'unknown_id', 
      

      name: item.name || 'Unknown',
      

      age: (typeof item.age === 'number') ? item.age : 25,
      

      avatar: item.avatar || item.image || item.profileImage || 'https://via.placeholder.com/300', 
      

      type: item.type === 'super' ? 'super' : 'like',
      

      isPrivate: !!item.isPrivate,
      

      timestamp: item.timestamp || new Date().toISOString(),
    }));

  } catch (error) {
    console.error("Error fetching likes:", error);
    return [];
  }
};


export const respondToLike = async (
  currentUserId: string, 
  targetUserId: string, 
  action: 'accept' | 'reject'
) => {
  const direction = action === 'accept' ? 'right' : 'left';
  return await submitSwipe(currentUserId, targetUserId, direction);
};