
const API_URL = 'http://172.20.10.3:8000/api/swipe';

export const submitSwipe = async (
  currentUserId: string, 
  swipedUserId: string, 
  direction: 'left' | 'right' | 'super'
) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        user_id: currentUserId,
        swiped_user_id: swipedUserId,
        direction: direction,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Swipe Service Error:', error);
    throw error;
  }
};