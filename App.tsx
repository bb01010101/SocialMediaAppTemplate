import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClerkProvider } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignInScreen from './src/screens/SignInScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Notifications':
            iconName = focused ? 'notifications' : 'notifications-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'square';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#0066ff',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Notifications" component={NotificationsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </ClerkProvider>
  );
}