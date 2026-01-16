import { StyleSheet, Image, ScrollView } from 'react-native';

import { Text, View } from '@/components/Themed';
import { mockUsers } from '@/constants/Users';

export default function ProfileScreen() {
  const currentUser = mockUsers[0]; // Assuming the first user is the current user

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileCard}>
        <Image source={{ uri: currentUser.imageUrl }} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{currentUser.name}, {currentUser.age}</Text>
          <Text style={styles.location}>{currentUser.location}</Text>
          <Text style={styles.bio}>{currentUser.bio}</Text>
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
