import React from 'react';
import { Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, DarkTheme, Provider as PaperProvider, configureFonts } from 'react-native-paper';

import Store from '@store/store';
import Styles from '@assets/styles';
import fontConfig from '@assets/fonts';
import { DarkColors, DefaultColors } from '@assets/colors';
import { MainStack } from './components/MainStack';

/**
 * App functional component
 * @returns JSX
 */
const Main = () => {

  const colorScheme = Appearance.getColorScheme();
  const paperTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const customColors = colorScheme === 'dark' ? DarkColors : DefaultColors;
  const { colors, ..._theme } = paperTheme;
  const theme = {
    ..._theme,
    colors: { ...colors, ...customColors },
    styles: Styles,
    fonts: configureFonts(fontConfig),
  };

  return (
    <Store>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <MainStack />
        </SafeAreaProvider>
      </PaperProvider>
    </Store>
  )
}

export default App = () => <Main />;
