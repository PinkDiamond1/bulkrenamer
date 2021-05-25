import React from 'react';
import { View } from 'react-native';
import { TextInput, Card, Paragraph, Caption } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import { CardTitle, inputProps, InputDivider } from './CardUtils';
import styles from './styles';


const Elements = ({
  colors,
  toHide,
  refs: { caseRef, moveFromStartRef, moveFromEndRef, moveToRef }
}) => {

  const [stringCase, setStringCase] = React.useState(-1);
  const cardStyle = {
    paddingLeft: 72,
    paddingHorizontal: 16,
    ...(toHide ? { height: 0, opacity: 0 } : {}),
  };

  return (
    <Card.Content style={cardStyle}>

      <Paragraph>Change the case of filename</Paragraph>
      <Picker
        mode='dropdown'
        ref={caseRef}
        style={{ color: colors.text }}
        selectedValue={stringCase}
        dropdownIconColor={colors.text}
        onValueChange={(val) => setStringCase(val)}>
        {
          ['Default', 'Upper Case', 'Lower Case', 'Title Case', 'Sentence Case'].map((item, i) => (
            <Picker.Item key={i} label={item} value={i-1} color={colors.text} />
          ))
        }
      </Picker>

      <Paragraph>Move a substring to another position</Paragraph>
      <Caption>
        Either start index (default 0) or end index (default name's end) are to be given.
        Offset value (negative implies to the left of start index) defaults to name's end.
      </Caption>
      <View style={styles.inlineInputContainer}>
        <TextInput {...inputProps} label='Start' ref={moveFromStartRef} keyboardType='number-pad' />
        <InputDivider />
        <TextInput {...inputProps} label='End' ref={moveFromEndRef} keyboardType='number-pad' />
        <InputDivider />
        <TextInput {...inputProps} label='Offset' ref={moveToRef} keyboardType='number-pad' />
      </View>

    </Card.Content>
  )
}


export const FormatCard = ({ colors, refs }) => {

  const [expanded, toggleExpanded] = React.useState(false);
  const cardInfo = {
    title: 'Format',
    icon: 'format-text-variant',
    subtitle: 'Change the case or move substring'
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
