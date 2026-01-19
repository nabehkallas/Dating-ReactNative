// src/services/MatchService.ts

// Replace with your laptop IP
const API_URL = 'http://172.20.10.3:8000/api'; 

export interface PendingLike {
  id: string; // The user ID of the person who liked you
  name: string;
  age: number;
  avatar: string;
  type: 'like' | 'super';
  isPrivate: boolean;
  timestamp: string;
}

// 1. Fetch people who liked you
export const fetchPendingLikes = async (userId: string): Promise<PendingLike[]> => {
  try {
    const response = await fetch(`${API_URL}/matches/pending?user_id=${userId}`);
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching likes:", error);
    return [];
  }
};

// 2. Accept or Reject a match
// We just reuse the Swipe Logic!
// Direction 'right' = Accept (Match)
// Direction 'left' = Reject (Remove)
import { submitSwipe } from './SwipeService';

export const respondToLike = async (
  currentUserId: string, 
  targetUserId: string, 
  action: 'accept' | 'reject'
) => {
  const direction = action === 'accept' ? 'right' : 'left';
  return await submitSwipe(currentUserId, targetUserId, direction);
};