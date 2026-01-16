import { StyleSheet, Image, ScrollView } from 'react-native';

import { Text, View } from '@/components/Themed';
import { mockUsers } from '@/constants/Users';

export default function ProfileScreen() {
  const currentUser = mockUsers.find(u => u.uid === 'uid1'); 

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Not Found</Text>
      </View>
    );
  }

  const displayLocation = typeof currentUser.location === 'string'
    ? currentUser.location
    : `Lat: ${currentUser.location.latitude}, Lon: ${currentUser.location.longitude}`;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileCard}>
        <Image source={{ uri: currentUser.profileImage }} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{currentUser.name}, {currentUser.age}</Text>
          <Text style={styles.location}>{displayLocation}</Text>
          <Text style={styles.bio}>{currentUser.bio}</Text>
          {currentUser.gallery && currentUser.gallery.length > 0 && (
            <View style={styles.galleryContainer}>
              <Text style={styles.galleryTitle}>Gallery</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {currentUser.gallery.map((img, index) => (
                  <Image key={index} source={{ uri: img }} style={styles.galleryImage} />
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 15,
  },
  infoContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  location: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  bio: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 15,
  },
  galleryContainer: {
    marginTop: 10,
    width: '100%',
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
