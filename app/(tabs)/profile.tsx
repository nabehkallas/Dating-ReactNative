import { fetchProfile, UserProfile } from '@/services/ProfileService';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const currentUserId = '4BKr6lVknOESsJ97N7x8XGPv9XHR'; 
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await fetchProfile(currentUserId);
    setProfile(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fe3c72" />
      </View>
    );
  }

  if (!profile) return null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Header & Profile Image */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: profile.profileImage || 'https://placehold.co/400' }} 
              style={styles.avatar} 
            />
            
            {/* Verified Badge */}
            {profile.isVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={12} color="#fff" />
              </View>
            )}
            
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="pencil" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.name}>
            {profile.name}, {profile.age}
          </Text>

          <Text style={styles.subtext}>{profile.gender ? profile.gender.toUpperCase() : ''}</Text>
        </View>

        
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statButton}>
            <View style={styles.iconCircle}>
              <Ionicons name="settings-sharp" size={24} color="#999" />
            </View>
            <Text style={styles.statLabel}>SETTINGS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statButtonMain}>
            <View style={styles.iconCircleMain}>
              <Ionicons name="camera" size={30} color="#fff" />
            </View>
            <Text style={styles.statLabelMain}>ADD MEDIA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statButton}>
            <View style={styles.iconCircle}>
              <Ionicons name="pencil" size={24} color="#999" />
            </View>
            <Text style={styles.statLabel}>EDIT INFO</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.bioText}>{profile.bio || "No bio yet."}</Text>
        </View>

        {profile.gallery && profile.gallery.length > 0 && (
          <View style={styles.section}>
             <Text style={styles.sectionTitle}>Gallery</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
               {profile.gallery.map((imgUrl, index) => (
                 <Image key={index} source={{ uri: imgUrl }} style={styles.galleryImage} />
               ))}
             </ScrollView>
          </View>
        )}

        
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} /> 
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingBottom: 20 },
  
  header: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  avatarContainer: { position: 'relative', marginBottom: 15 },
  avatar: { 
    width: 150, 
    height: 150, 
    borderRadius: 75, 
    borderWidth: 4, 
    borderColor: '#fff' 
  },
  verifiedBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#20D3E5', // Blue Verified Color
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 2
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fe3c72',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff'
  },
  name: { fontSize: 26, fontWeight: 'bold', color: '#000' },
  subtext: { fontSize: 14, color: '#999', marginTop: 5, letterSpacing: 1 },

  statsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    marginBottom: 30 
  },
  statButton: { alignItems: 'center', marginHorizontal: 15 },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 8
  },
  statLabel: { fontSize: 12, fontWeight: 'bold', color: '#999' },
  statButtonMain: { alignItems: 'center', marginHorizontal: 15, marginBottom: 5 },
  iconCircleMain: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fe3c72',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fe3c72',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 8
  },
  statLabelMain: { fontSize: 12, fontWeight: 'bold', color: '#fe3c72' },

  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  bioText: { fontSize: 15, color: '#555', lineHeight: 22 },
  
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#eee'
  },

  logoutButton: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee'
  },
  logoutText: { color: '#fe3c72', fontSize: 16, fontWeight: '600' }
});