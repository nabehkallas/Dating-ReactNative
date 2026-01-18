import axios from 'axios';
import { FeedUser } from '../constants/Users';

const API_URL = 'http://172.20.10.3:8000/api';

export const fetchFeed = async (currentUserId: string): Promise<FeedUser[]> => {
  try {
    const response = await axios.get<{ data: any[] }>(`${API_URL}/feed`, {
      params: { user_id: currentUserId }
    });

    const cleanUsers: FeedUser[] = response.data.data.map((rawUser) => {
      
      let cleanLocation = rawUser.location;
      if (Array.isArray(rawUser.location) && rawUser.location.length >= 2) {
        cleanLocation = {
          latitude: rawUser.location[0],
          longitude: rawUser.location[1]
        };
      }

      return {
        ...rawUser,
        location: cleanLocation,
        isVerified: rawUser.isVerified || false, 
        gallery: rawUser.gallery || [],
      };
    });

    return cleanUsers;

  } catch (error) {
    console.error('Error fetching feed:', error);
    throw error;
  }
};