import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HomeHeaderProps {
  title?: string;
  subtitle?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({ 
  title = "Discover", 
  subtitle = "Chicago, IL",
  onLeftPress,
  onRightPress
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onLeftPress} style={styles.headerIconSmall}>
        <Text style={styles.iconText}>‹</Text>
      </TouchableOpacity>
      
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
      
      <TouchableOpacity onPress={onRightPress} style={styles.headerIconSmall}>
        <Text style={styles.iconText}>≡</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 10,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#000' },
  headerSubtitle: { fontSize: 12, color: '#888', textAlign: 'center' },
  headerIconSmall: {
    width: 40, height: 40, backgroundColor: 'white', borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  iconText: { fontSize: 20, color: '#fe3c72', fontWeight: 'bold' },
});