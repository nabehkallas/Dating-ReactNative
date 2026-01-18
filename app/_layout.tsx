import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/components/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export {
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
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
            tabBarActiveTintColor: '#fe3c72',
            tabBarInactiveTintColor: '#C7C7CC',
            headerShown: false,
            tabBarShowLabel: false,

            tabBarStyle: {
              height: Platform.OS === 'ios' ? 88 : 60,
              paddingTop: 10,
              backgroundColor: 'white',
              borderTopWidth: 0,
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
          }}>

          <Tabs.Screen
            name="index"
            options={{
              title: 'Discover',
              tabBarIcon: ({ color }) => <TabBarIcon name="albums" color={color} />,
            }}
          />

          <Tabs.Screen
            name="matches"
            options={{
              title: 'Matches',
              tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
            }}
          />

          <Tabs.Screen
            name="chat"
            options={{
              title: 'Chat',
              tabBarIcon: ({ color }) => <TabBarIcon name="chatbubbles" color={color} />,
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
            }}
          />

          <Tabs.Screen
            name="+not-found"
            options={{
              href: null,
            }}
          />
        
        </Tabs>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}