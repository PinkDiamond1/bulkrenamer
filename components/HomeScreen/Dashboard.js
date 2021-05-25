import React from 'react';
import { Text, Card, IconButton, Paragraph, Caption, Avatar } from 'react-native-paper';


/**
 * Dashboard
 * This component is the dashboard on the Form.
 * It shows details about number of files and the directory from where the files are selected
 * @returns JSX
 */
export const Dashboard = React.memo(({ state, colors }) => {

  const [visible, toggleDashboard] = React.useState(false);
  
  const rightButton = props => (
    <IconButton
      {...props}
      icon={'chevron-' + (visible ? 'up' : 'down')}
      color={colors.background}
      onPress={() => toggleDashboard(!visible)} />
  );

  const cardSubtitle = !visible
    ? (
      state.entries.length
        ? state.entries.length + ' files selected for renaming.'
        : 'No file has been selected'
    ) : 'Details';

  return (
    <Card style={{ backgroundColor: colors.accent }}>
      <Card.Title
        title='Dashboard'
        subtitle={cardSubtitle}
        titleStyle={{ color: colors.background }}
        subtitleStyle={{ color: colors.surface }}
        left={props => (
          <Avatar.Icon
            {...props}
            icon='view-dashboard'
            color={colors.accent}
            style={{ backgroundColor: colors.background }} />
        )}
        right={state.entries.length ? rightButton : undefined}
        rightStyle={{ alignSelf: 'flex-start' }} />

      {
        visible
        && (
          <Card.Content style={{ paddingLeft: 72 }}>
            <Paragraph>
              <Text style={{ color: colors.background, fontWeight: 'bold' }}>Directory Name - </Text>
              <Caption style={{ color: colors.surface }}>
                {state.directoryPath.split('/').slice(-1)[0] || '<Root Directory>'}
              </Caption>
            </Paragraph>
            <Paragraph>
              <Text style={{ color: colors.background, fontWeight: 'bold' }}>Number of files - </Text>
              <Caption style={{ color: colors.surface }}>{state.entries.length}</Caption>
            </Paragraph>
          </Card.Content>
        )
      }
    </Card>
  );
}, (prevProps, nextProps) => (
  prevProps.state.directoryPath === nextProps.state.directoryPath
));
