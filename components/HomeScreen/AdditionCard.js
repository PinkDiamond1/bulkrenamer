import React from 'react';
import { View } from 'react-native';
import { TextInput, Card, Paragraph, Caption } from 'react-native-paper';

import { CardTitle, InputDivider, inputProps } from './CardUtils';
import styles from './styles';


const Elements = ({
  toHide,
  refs: { prefixRef, suffixRef, insertAtRef, insertValRef }
}) => {

  const cardStyle = {
    paddingLeft: 72,
    paddingHorizontal: 16,
    ...(toHide ? { height: 0, opacity: 0 } : {}),
  };
  
  return (
    <Card.Content style={cardStyle}>

      <Paragraph>Prefix and Suffix</Paragraph>
      <View style={styles.inlineInputContainer}>
        <TextInput {...inputProps} label='Prefix' ref={prefixRef} />
        <InputDivider />
        <TextInput {...inputProps} label='Suffix' ref={suffixRef} />
      </View>

      <Paragraph>Insert string at a position</Paragraph>
      <Caption>Inserts a provided string at the position (starting with 0).</Caption>
      <View style={styles.inlineInputContainer}>
        <TextInput {...inputProps} label='Insert value' ref={insertValRef} />
        <InputDivider />
        <TextInput {...inputProps} label='Insert at' keyboardType='numeric' ref={insertAtRef} />
      </View>

    </Card.Content>
  )
}


export const AdditionCard = ({ colors, refs }) => {

  const [expanded, toggleExpanded] = React.useState(true);
  const cardInfo = {
    title: 'Add',
    icon: 'format-annotation-plus',
    subtitle: 'Prefix, suffix, insert at position, etc.'
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
