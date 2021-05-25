import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme as usePaperTheme } from 'react-native-paper';

import { HomeScreen } from './HomeScreen/HomeScreen';
import { PreviewScreen } from './PreviewScreen/PreviewScreen';
import { FileSystemScreen } from './FileSystemScreen/FileSystemScreen';

const AppNavigator = createStackNavigator();

/**
 * MainStack
 * This is the root stack for the app. All the components branch from this Component.
 */
export const MainStack = () => {

  const paperTheme = usePaperTheme();
  const navigationTheme = {
    dark: paperTheme.dark,
    colors: {
      ...paperTheme.colors,
      card: paperTheme.colors.surface,
      border: paperTheme.colors.backdrop,
    }
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator.Navigator initialRouteName='HomeView'>

        <AppNavigator.Screen
          name='HomeView'
          component={HomeScreen}
          options={{
            headerTitle: 'Bulk Renamer',
            headerTitleAlign: 'center',
            headerTitleStyle: paperTheme.fonts.head.medium,
            headerStyle: { backgroundColor: paperTheme.colors.background, elevation: 0 },
          }} />

        <AppNavigator.Screen
          name='FileSystemView'
          component={FileSystemScreen}
          options={{ headerShown: false }} />

        <AppNavigator.Screen
          name='PreviewView'
          component={PreviewScreen}
          options={{
            headerTitle: 'Preview',
          }} />

      </AppNavigator.Navigator>
    </NavigationContainer>
  );
}
