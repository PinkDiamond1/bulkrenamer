import React from 'react';
import { View } from 'react-native';
import { IconButton, List } from 'react-native-paper';

import styles from './styles';

/**
 * BottomBar
 * Functional component which creates the Bottom Bar for the Form Component
 * @param {props} are the props containing values of theme and others
 * @returns JSX
 */
export const BottomBar = React.memo(({ colors, preview, onToggle, navigation }) => {

  return (
    <List.Section style={{ backgroundColor: colors.surface, ...styles.bottomBar }}>

      <View style={{ ...styles.bottomBarRow }}>
        <IconButton
          onPress={onToggle}
          color={colors.text}
          icon={'bug' + (preview ? '-check' : '')} />

        <IconButton
          icon='eye'
          color={colors.text}
          onPress={() => navigation.navigate('PreviewView')} />

        <IconButton icon='share' color={colors.text} />
      </View>

    </List.Section>
  );
}, (prevProps, nextProps) => (
  prevProps.preview === nextProps.preview
));