import React from 'react';
import { View } from 'react-native';
import { IconButton, Card, Avatar, useTheme } from 'react-native-paper';


export const CardTitle = ({ data, expanded, colors, onToggle }) => (
  <Card.Title
    title={data.title}
    subtitle={data.subtitle}
    subtitleNumberOfLines={2}
    left={props => (
      <Avatar.Icon {...props} icon={data.icon} style={{ backgroundColor: colors.accent }} />
    )}
    right={props => (
      <CardExpandButton isExpanded={expanded} onPress={onToggle} props={props} />
    )} />
);


const CardExpandButton = ({ isExpanded, onPress, ...props }) => (
  <IconButton
    {...props}
    icon={'chevron-' + (isExpanded ? 'up' : 'down')}
    onPress={onPress} />
);


export const InputDivider = () => (
  <View style={{ width: 16 }}></View>
);


export const inputProps = {
  mode: 'outlined', dense: true, style: { flex: 1 }
};
