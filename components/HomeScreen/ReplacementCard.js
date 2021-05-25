import React from 'react';
import { View } from 'react-native';
import { TextInput, Switch, Card, Paragraph, Caption } from 'react-native-paper';

import { CardTitle, inputProps, InputDivider } from './CardUtils';
import styles from './styles';


const Elements = ({
  toHide,
  refs: { replaceFindRef, replaceReplaceRef, extensionValRef }
}) => {

  const cardStyle = {
    paddingLeft: 72,
    paddingHorizontal: 16,
    ...(toHide ? { height: 0, opacity: 0 } : {}),
  };

  return (
    <Card.Content style={cardStyle}>

      <Paragraph>Find the substring and replace</Paragraph>
      <View style={styles.inlineInputContainer}>
        <TextInput {...inputProps} label='Find' ref={replaceFindRef} />
        <InputDivider />
        <TextInput {...inputProps} label='Replace with' ref={replaceReplaceRef} />
      </View>

      <Paragraph>Add an extension</Paragraph>
      <Caption>Provide a new extension (don't mention fullstop). It will replace the current extension.</Caption>
      <View style={styles.inlineInputContainer}>
        <TextInput {...inputProps} label='Extension' ref={extensionValRef} />
      </View>

    </Card.Content>
  )
}


export const ReplacementCard = ({ colors, refs }) => {

  const [expanded, toggleExpanded] = React.useState(false);
  const cardInfo = {
    title: 'Replace',
    icon: 'find-replace',
    subtitle: 'Replace characters, or change extension'
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
