import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User } from '@/constants/Users';

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}, {user.age}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <Text style={styles.location}>{user.location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 20,
    width: '90%',
    aspectRatio: 0.75, // Adjust as needed for card proportions
  },
  image: {
    width: '100%',
    height: '70%', // Adjust as needed
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
});

export default Card;
