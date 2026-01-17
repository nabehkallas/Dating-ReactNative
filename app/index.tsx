import Card from '@/components/Card';
import { FeedUser } from '@/constants/Users';
import { fetchFeed } from '@/services/FeedService';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar // To control status bar color
  ,
  StyleSheet, // Import standard View
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');

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

  // --- Handlers ---
  const onSwipedRight = (index: number) => console.log(`❤️ LIKED: ${feed[index]?.name}`);
  const onSwipedLeft = (index: number) => console.log(`❌ PASSED: ${feed[index]?.name}`);
  const onSwipedTop = (index: number) => console.log(`🌟 SUPER: ${feed[index]?.name}`);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: '#f4f4f4' }]}>
        <ActivityIndicator size="large" color="#fe3c72" />
      </View>
    );
  }

  return (
    // 1. ROOT VIEW: Fills the WHOLE screen (including notch) with background color
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />

      {/* 2. SAFE AREA: Keeps content inside the safe boundaries */}
      <SafeAreaView style={styles.safeArea}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIconSmall}><Text style={styles.iconText}>‹</Text></TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Discover</Text>
            <Text style={styles.headerSubtitle}>Chicago, IL</Text>
          </View>
          <TouchableOpacity style={styles.headerIconSmall}><Text style={styles.iconText}>≡</Text></TouchableOpacity>
        </View>

        {/* SWIPER CONTAINER */}
        <View style={styles.swiperContainer}>
          {feed.length > 0 ? (
            <Swiper
              ref={swiperRef}
              cards={feed}
              cardIndex={0}
              renderCard={(cardUser) => {
                if (!cardUser) return <View />;
                return (
                  <View style={styles.cardWrapper}>
                    <Card user={cardUser} />
                  </View>
                );
              }}
              onSwipedLeft={onSwipedLeft}
              onSwipedRight={onSwipedRight}
              onSwipedTop={onSwipedTop}
              stackSize={3}
              stackScale={5}
              stackSeparation={15}
              disableBottomSwipe={true}
              animateOverlayLabelsOpacity
              animateCardOpacity
              backgroundColor={'transparent'}
              
              // 3. FIX: Adjust margins to account for Header (approx 60px)
              // This library positions absolutely, so we must push it down manually.
              cardVerticalMargin={10} 
              containerStyle={{ flex: 1 }} // Ensure the swiper itself flexes
              
              overlayLabels={{
                left: {
                  title: 'NOPE',
                  style: { label: { borderColor: '#FF4D4D', color: '#FF4D4D', borderWidth: 3 } },
                  wrapper: { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: 30, marginLeft: -30 }
                },
                right: {
                  title: 'LIKE',
                  style: { label: { borderColor: '#4CCC93', color: '#4CCC93', borderWidth: 3 } },
                  wrapper: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 30, marginLeft: 30 }
                }
              }}
            />
          ) : (
            <View style={styles.center}><Text>No more users! 🌍</Text></View>
          )}
        </View>

        {/* BOTTOM ACTION BUTTONS */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonSmall]} onPress={() => swiperRef.current?.swipeLeft()}>
            <Text style={[styles.buttonIcon, { color: '#E5566D' }]}>✕</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonLarge]} onPress={() => swiperRef.current?.swipeRight()}>
            <Text style={[styles.buttonIcon, { color: 'white', fontSize: 32 }]}>♥</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSmall]} onPress={() => swiperRef.current?.swipeTop()}>
            <Text style={[styles.buttonIcon, { color: '#8A2BE2' }]}>★</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  // 1. ROOT fills the physical screen
  rootContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4', // This color will now fill the notch area
  },
  // 2. SAFE AREA handles the layout padding
  safeArea: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 100, // Ensure header sits above swiper if they overlap
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#000' },
  headerSubtitle: { fontSize: 12, color: '#888', textAlign: 'center' },
  headerIconSmall: {
    width: 40, height: 40, backgroundColor: 'white', borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  iconText: { fontSize: 20, color: '#fe3c72', fontWeight: 'bold' },

  // SWIPER
  swiperContainer: {
    flex: 1, // Takes up remaining space between Header and Footer
    // We do NOT set overflow: 'hidden' because the swiper needs to move cards outside
  },
  cardWrapper: {
    flex: 1,
    // Adjust this height to control how "tall" the card is on screen
    height: height * 0.60, 
    borderRadius: 20,
  },

  // BUTTONS
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 20, 
    paddingTop: 10,
  },
  button: {
    backgroundColor: 'white',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5,
  },
  buttonSmall: { width: 60, height: 60, borderRadius: 30 },
  buttonLarge: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fe3c72', marginBottom: 10 },
  buttonIcon: { fontSize: 24, fontWeight: 'bold' }
});