import axios from 'axios';


const API_URL = 'http://172.20.10.3:8000/api'; 

export interface UserProfile {
  id: string;
  uid: string;
  name: string;
  age: number;
  bio: string;
  gender: string;
  profileImage: string; // Renamed from avatar
  gallery: string[];    // Renamed from images
  isVerified: boolean;
  preferences: {
    minAge?: number;
    maxAge?: number;
    distance?: number;
    gender?: string;
  };
}

export const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      params: { user_id: userId }
    });

    if (response.data.status === 'success') {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    return null;
  }
};