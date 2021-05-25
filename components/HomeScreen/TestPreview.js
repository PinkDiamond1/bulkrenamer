import React from 'react';
import { IconButton, List, Divider } from 'react-native-paper';

import styles from './styles';


/**
 * TestPreview
 * Show the Test Preview for the form params over the top of the HomeScreen
 * @param {props} containing theme values, and if to show or not
 * @returns JSX
 */
export const TestPreview = React.memo(({
  colors,
  testString,
  testOutput,
  onRun,
  onPressEdit,
  isVisible
}) => {

  return (
    <List.Section style={[!isVisible && { opacity: 0, height: 0 }, { marginVertical: 0 }]}>

      <List.Item
        title='Test String'
        description={testString}
        descriptionStyle={[styles.testViewText, { color: colors.error }]}
        style={{ backgroundColor: colors.surface }}
        left={props => (
          <IconButton {...props} icon='pencil' color={colors.text} onPress={onPressEdit} />
        )} />

      <Divider style={{ marginHorizontal: 8 }} />

      <List.Item
        title='Test Preview'
        description={testOutput}
        descriptionStyle={[styles.testViewText, { color: colors.primary }]}
        style={{ backgroundColor: colors.surface }}
        left={props => (
          <IconButton {...props} icon='equal' color={colors.text} onPress={onRun} />
        )} />

      <List.Item
        title=''
        style={{
          backgroundColor: colors.background,
          height: 16
        }} />

    </List.Section>
  );
}, (prevProps, nextProps) => (
  prevProps.isVisible === nextProps.isVisible
  && prevProps.testString === nextProps.testString
  && prevProps.testOutput === nextProps.testOutput
));
