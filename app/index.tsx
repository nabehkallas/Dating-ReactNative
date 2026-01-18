import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StatusBar, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedUser } from '@/constants/Users';
import { fetchFeed } from '@/services/FeedService';
import { submitSwipe } from '@/services/SwipeService';

import { ActionButtons } from '@/components/Home/ActionButtons';
import { HomeHeader } from '@/components/Home/HomeHeader';
import { SwipeFeed } from '@/components/Home/SwipeFeed';

export default function HomeScreen() {
  const [feed, setFeed] = useState<FeedUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  const swiperRef = useRef<Swiper<FeedUser>>(null);
  const currentUserId = '1Ujr92RFy3D3hb3uRT40'; 

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const fetchedFeed = await fetchFeed(currentUserId);
        const validUsers = fetchedFeed.filter(u => u.profileImage && u.profileImage.startsWith('http'));
        setFeed(validUsers);
      } catch (error) {
        console.error("Failed to load feed:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFeed();
  }, []);

  const handleSwipeApi = async (direction: 'left' | 'right' | 'super', index: number) => {
    const swipedUser = feed[index];
    if (!swipedUser) return;

    try {
      
      const data = await submitSwipe(currentUserId, swipedUser.id, direction);
      
            if (data.match) {
        Alert.alert(
          "🎉 It's a Match!", 
          `You and ${swipedUser.name} liked each other! Go to chat to say hi.`
        );
      }

    } catch (error) {
      
      console.log("Swipe failed silently");
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: '#f4f4f4' }]}>
        <ActivityIndicator size="large" color="#fe3c72" />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <HomeHeader />

        <SwipeFeed 
          ref={swiperRef}
          data={feed}
          onSwipeLeft={(index) => handleSwipeApi('left', index)}
          onSwipeRight={(index) => handleSwipeApi('right', index)}
          onSwipeTop={(index) => handleSwipeApi('super', index)}
        />

        <ActionButtons 
          onSwipeLeft={() => swiperRef.current?.swipeLeft()}
          onSwipeRight={() => swiperRef.current?.swipeRight()}
          onSwipeTop={() => swiperRef.current?.swipeTop()}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});