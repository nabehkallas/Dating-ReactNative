import axios from 'axios';


const API_URL = 'http://172.20.10.3:8000/api';

import { Story } from '../constants/Story';

export const fetchStoriesFeed = async (userId: string): Promise<Story[]> => {
  try {
    const response = await axios.get(`${API_URL}/stories/feed`, {
      params: { user_id: userId }
    });

    if (response.data.status === 'success') {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching stories feed:", error);
    throw error;
  }
};


export const markStoryViewed = async (storyId: string, userId: string) => {
  try {
    await axios.post(`${API_URL}/stories/view`, {
      story_id: storyId,
      user_id: userId
    });
  } catch (error) {

    console.log("Failed to mark view");
  }
};