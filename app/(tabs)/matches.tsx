import { isToday, isYesterday } from 'date-fns';
import * as Haptics from 'expo-haptics'; // Optional: Adds physical feedback
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchPendingLikes, PendingLike, respondToLike } from '@/services/MatchService';

import MatchRow from '@/components/Matches/MatchRow';
import SectionHeader from '@/components/Matches/SectionHeader';

const CARD_SPACING = 15;

export default function MatchesScreen() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = 'user_1'; 

  useEffect(() => {
    loadLikes();
  }, []);

  const loadLikes = async () => {
    try {
      const data = await fetchPendingLikes(currentUserId);
      const grouped = groupLikesByDate(data);
      setSections(grouped);
    } catch (error) {
      console.log("Error loading likes", error);
    } finally {
      setLoading(false);
    }
  };

  const chunkArray = (array: PendingLike[], size: number) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  const groupLikesByDate = (likes: PendingLike[]) => {
    const today: PendingLike[] = [];
    const yesterday: PendingLike[] = [];
    const earlier: PendingLike[] = [];

    likes.forEach(like => {
      const date = new Date(like.timestamp);
      if (isToday(date)) today.push(like);
      else if (isYesterday(date)) yesterday.push(like);
      else earlier.push(like);
    });

    const result = [];
    
    if (today.length > 0) result.push({ title: 'Today', data: chunkArray(today, 2) });
    if (yesterday.length > 0) result.push({ title: 'Yesterday', data: chunkArray(yesterday, 2) });
    if (earlier.length > 0) result.push({ title: 'Earlier', data: chunkArray(earlier, 2) });

    return result;
  };

  
  const handleResponse = async (user: PendingLike, action: 'accept' | 'reject') => {
    
  
    if (action === 'accept') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

  
    setSections(currentSections => {
      return currentSections.map(section => {
  
        const updatedChunks = section.data.map((chunk: PendingLike[]) => 
          chunk.filter(u => u.id !== user.id)
        ).filter((chunk: PendingLike[]) => chunk.length > 0); // Remove empty chunks

        return { ...section, data: updatedChunks };
      }).filter(section => section.data.length > 0); // Remove empty sections
    });

  
    if (action === 'accept') {
       setTimeout(() => {
          Alert.alert("It's a Match! 🎉", `You can now chat with ${user.name}`);
       }, 200);
    }

  try {
      await respondToLike(currentUserId, user.id, action);
      
    } catch (error) {
      console.error("Failed to sync match", error);
      Alert.alert("Error", "Action failed. Reloading...");
      
      
      loadLikes(); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
        <Text style={styles.headerSubtitle}>This is a list of people who have liked you.</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fe3c72" />
        </View>
      ) : sections.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No new likes yet.</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MatchRow items={item} onResponse={handleResponse} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionHeader title={title} />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  header: { padding: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 34, fontWeight: 'bold', color: '#000' },
  headerSubtitle: { fontSize: 14, color: '#666', marginTop: 5, marginBottom: 10 },
  
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },

  listContent: { paddingHorizontal: CARD_SPACING, paddingBottom: 40 },
});