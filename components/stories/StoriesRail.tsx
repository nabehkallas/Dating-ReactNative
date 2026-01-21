import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
// Import the service
import { Story } from '@/constants/Story';
import { fetchStoriesFeed } from '@/services/StoryService';

export default function StoriesRail({ currentUserId }: { currentUserId: string }) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const data = await fetchStoriesFeed(currentUserId);
      setStories(data);
    } catch (error) {
      // Error is already logged in service
    } finally {
      setLoading(false);
    }
  };

  const handlePressStory = (story: Story) => {
    console.log("Open Story:", story.id);
    
  };

  const renderItem = ({ item }: { item: Story }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlePressStory(item)}>
     
      <View style={styles.borderContainer}>
        <View style={styles.whiteSpacing}>
         
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.avatar} 
          />
        </View>
      </View>
      
      <Text style={styles.username} numberOfLines={1}>
        {item.timeAgo}
      </Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator style={{ margin: 20 }} />;
  if (stories.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Recent Stories</Text>
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 70,
  },
  borderContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#fe3c72',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteSpacing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
    resizeMode: 'cover',
  },
  username: {
    marginTop: 5,
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  }
});