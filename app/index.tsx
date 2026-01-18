import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeedUser } from '@/constants/Users';
import { fetchFeed } from '@/services/FeedService';


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


  const handleLike = (index: number) => console.log('Liked', feed[index]?.name);
  const handlePass = (index: number) => console.log('Passed', feed[index]?.name);
  const handleSuperLike = (index: number) => console.log('Super Liked', feed[index]?.name);

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
          onSwipeLeft={handlePass}
          onSwipeRight={handleLike}
          onSwipeTop={handleSuperLike}
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