import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router'; // Import Tabs here
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native'; // Import Platform

import { useColorScheme } from '@/components/useColorScheme';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index', // Set initial route to 'index'
};

SplashScreen.preventAutoHideAsync();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#fe3c72', // Match your Brand Red
            tabBarInactiveTintColor: '#C7C7CC', // Grey for inactive
            headerShown: false, // We handle headers inside the screens
            tabBarShowLabel: false, // Hides "Cards", "Matches" text (Matches design)

            tabBarStyle: {
              height: Platform.OS === 'ios' ? 88 : 60, // Taller bar looks more modern
              paddingTop: 10,
              backgroundColor: 'white',
              borderTopWidth: 0, // Removes the ugly top line
              elevation: 10, // Shadow for Android
              shadowColor: '#000', // Shadow for iOS
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
          }}>

          {/* 1. CARDS TAB (Home) */}
          <Tabs.Screen
            name="index"
            options={{
              title: 'Discover',
              // 'albums' looks more like a stack of cards than 'copy'
              tabBarIcon: ({ color }) => <TabBarIcon name="albums" color={color} />,
            }}
          />

          {/* 2. MATCHES TAB */}
          <Tabs.Screen
            name="matches"
            options={{
              title: 'Matches',
              tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
            }}
          />

          {/* 3. CHAT TAB */}
          <Tabs.Screen
            name="chat"
            options={{
              title: 'Chat',
              tabBarIcon: ({ color }) => <TabBarIcon name="chatbubbles" color={color} />,
            }}
          />

          {/* 4. PROFILE TAB */}
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
            }}
          />
          <Tabs.Screen
            name="modal"
            options={{
              presentation: 'modal',
              href: null, // Hide the modal from the tab bar
            }}
          />
        </Tabs>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}