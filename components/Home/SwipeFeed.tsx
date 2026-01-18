import Card from '@/components/Card';
import { FeedUser } from '@/constants/Users';
import React, { forwardRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const { height } = Dimensions.get('window');

interface SwipeFeedProps {
  data: FeedUser[];
  onSwipeLeft: (index: number) => void;
  onSwipeRight: (index: number) => void;
  onSwipeTop?: (index: number) => void;
}


export const SwipeFeed = forwardRef<Swiper<FeedUser>, SwipeFeedProps>(({ 
  data, 
  onSwipeLeft, 
  onSwipeRight,
  onSwipeTop 
}, ref) => {
  
  if (data.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No more users! 🌍</Text>
      </View>
    );
  }

  return (
    <View style={styles.swiperContainer}>
      <Swiper
        ref={ref}
        cards={data}
        cardIndex={0}
        renderCard={(cardUser) => {
          if (!cardUser) return <View />;
          return (
            <View style={styles.cardWrapper}>
              <Card user={cardUser} />
            </View>
          );
        }}
        onSwipedLeft={onSwipeLeft}
        onSwipedRight={onSwipeRight}
        onSwipedTop={onSwipeTop}
        stackSize={3}
        stackScale={5}
        stackSeparation={15}
        disableBottomSwipe={true}
        animateOverlayLabelsOpacity
        animateCardOpacity
        backgroundColor={'transparent'}
        cardVerticalMargin={20}
        
      />
    </View>
  );
});

const styles = StyleSheet.create({
  swiperContainer: {
    flex: 1,
    marginBottom: 100, 
  },
  cardWrapper: {
    flex: 1,
    height: height * 0.60, 
    borderRadius: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});