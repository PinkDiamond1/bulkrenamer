import React from 'react';
import { FlatList, View } from 'react-native';
import { IconButton, Divider, List, Headline } from 'react-native-paper';

import styles from './styles';

const DirectoryItem = ({ item }, { onNavigate, theme }) => (
  <React.Fragment>
    <List.Item
      title={item.name}
      description='Folder'
      left={props => <List.Icon {...props} icon='folder' />}
      onPress={() => onNavigate(item.path)}
      descriptionStyle={{ marginTop: 4 }} />
    <Divider />
  </React.Fragment>
);


const ItemsFooter = ({ theme, countOfFiles }) => (
  <List.Item
    title={countOfFiles + ' file' + (countOfFiles !== 1 ? 's' : '') + ' selected'}
    titleStyle={{
      ...theme.fonts.head.medium,
      fontSize: 20,
      color: theme.colors.onHighlight
    }}
    left={props => <List.Icon {...props} icon='check' color={theme.colors.onHighlight} />}
    style={{ backgroundColor: theme.colors.highlight, elevation: 3, }} />
);


const ListEmptyComponent = ({ theme }) => (
  <View style={styles.emptyDirContainer}>
    <IconButton icon='folder' size={48} />
    <Headline style={{ color: theme.colors.text }}>No subfolder here!</Headline>
  </View>
);


export const DirectoryItems = (props) => {
  const keyExtractor = (_, ind) => ind;
  return (
    <React.Fragment>
      <FlatList
        data={props.data}
        renderItem={item => DirectoryItem(item, props)}
        keyExtractor={keyExtractor}
        ListEmptyComponent={() => <ListEmptyComponent theme={props.theme} />} />

      <ItemsFooter theme={props.theme} countOfFiles={props.countOfFiles} />
    </React.Fragment>
  );
}
