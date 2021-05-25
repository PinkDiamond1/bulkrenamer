import React from 'react';
import { Avatar, Text, Card, Paragraph } from 'react-native-paper';


export const Summary = ({ colors, fonts, entries, path }) => {

  const { fgColor, bgColor } = entries.length
    ? { fgColor: colors.background, bgColor: colors.accent }
    : { fgColor: colors.background, bgColor: colors.error }

  return (
    <Card style={{ backgroundColor: bgColor }}>
      <Card.Title
        title='Summary'
        subtitle='Details about selected files'
        titleStyle={{ color: fgColor }}
        subtitleStyle={{ color: fgColor }}
        left={props => (
          <Avatar.Icon {...props} icon='eye' style={{ backgroundColor: fgColor }} />
        )}
      />
      <Card.Content style={{ paddingLeft: 72 }}>
        <Paragraph>
          {
            entries.length
              ? (
                <React.Fragment>
                  <Text style={{ color: fgColor }}>
                    {entries.length} file(s) have been selected for renaming from
              </Text>
                  <Text style={[fonts.medium, { color: fgColor }]}>
                    {' ' + (path || '<Root Directory>')}
                  </Text>
                </React.Fragment>
              ) : (
                <Text style={{ color: fgColor }}>
                  No files have been selected.
                </Text>
              )
          }
        </Paragraph>
      </Card.Content>
    </Card>
  );
}