import React from 'react';
import {
  HeaderBackButton,
  createStackNavigator,
  HeaderStyleInterpolators,
  CardStyleInterpolators
} from '@react-navigation/stack';
import { useTheme as usePaperTheme } from 'react-native-paper';

import { DirectoryScreen } from './DirectoryScreen';


const FSNavigator = createStackNavigator();
const DirectoryScreenHeaderOptions = (props) => ({
  headerTitleStyle: usePaperTheme().fonts.head.medium,
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerLeft: (headerProps) => (
    <HeaderBackButton
      {...headerProps}
      onPress={() => props.navigation.navigate('HomeView')} />
  ),
});


export const FileSystemScreen = (props) => {
  return (
    <FSNavigator.Navigator headerMode='screen'>

      <FSNavigator.Screen
        name='DirectoryView'
        component={DirectoryScreen}
        options={DirectoryScreenHeaderOptions(props)} />

    </FSNavigator.Navigator>
  );
}

