import React from 'react';
import { View } from 'react-native';
import { TextInput, Card, Paragraph, Caption } from 'react-native-paper';

import { CardTitle, InputDivider, inputProps } from './CardUtils';
import styles from './styles';


const Elements = ({
  toHide,
  refs: { lastRef, fromToStartRef, fromToEndRef }
}) => {

  const cardStyle = {
    paddingLeft: 72,
    paddingHorizontal: 16,
    ...(toHide ? { height: 0, opacity: 0 } : {}),
  };

  return (
    <Card.Content style={cardStyle}>

      <Paragraph>Delete last few characters</Paragraph>
      <View style={styles.inlineInputContainer}>
        <TextInput {...inputProps} label='Number of characters' keyboardType='numeric' ref={lastRef} />
      </View>

      <Paragraph>Delete from an index to an index</Paragraph>
      <Caption>Providing only 'from' index will delete till the end.</Caption>
      <View style={styles.inlineInputContainer}>
        <TextInput {...inputProps} label='Delete from' keyboardType='numeric' ref={fromToStartRef} />
        <InputDivider />
        <TextInput {...inputProps} label='Delete till' keyboardType='numeric' ref={fromToEndRef} />
      </View>

    </Card.Content>
  )
}


export const DeletionCard = ({ colors, refs }) => {

  const [expanded, toggleExpanded] = React.useState(false);
  const cardInfo = {
    title: 'Delete',
    icon: 'format-annotation-minus',
    subtitle: 'Delete from last, or between a range'
  };

  return (
    <Card style={{ marginTop: 16 }}>
      <CardTitle
        data={cardInfo}
        colors={colors}
        expanded={expanded}
        onToggle={() => toggleExpanded(!expanded)} />
      <Elements colors={colors} toHide={!expanded} refs={refs} />
    </Card>
  )
}
