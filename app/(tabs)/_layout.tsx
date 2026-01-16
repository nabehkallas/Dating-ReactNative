import React from 'react';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name']; // Use Ionicons name type
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF4B6E', // Dating app primary color
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="home" // Renamed from index
        options={{
          title: 'Cards', // Changed title to Cards/Swipe
          tabBarIcon: ({ color }) => <TabBarIcon name="copy" color={color} />, // Ionicons for Cards/Swipe
          headerRight: () => (
            <Pressable>
              {({ pressed }) => (
                <Ionicons // Using Ionicons here as well
                  name="information-circle-outline" // Example info icon
                  size={25}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />, // Ionicons for Matches
        }}
      />
      <Tabs.Screen
        name="chat" // New tab for chat
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <TabBarIcon name="chatbubbles" color={color} />, // Ionicons for Chat
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />, // Ionicons for Profile
        }}
      />
    </Tabs>
  );
}
