import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Caption, Divider, IconButton, Paragraph } from 'react-native-paper';

import styles from './styles';
import ExecuteOperations, { RefsToValues } from '@store/operations';


const TableView = ({
  fonts,
  colors,
  entries,
  newNames,
  page,
  totalPages,
  fromNo,
  toNo,
  totalEntries,
  onPageChange
}) => (

  <ScrollView
    style={[styles.datatable, { backgroundColor: colors.surface }]}
    stickyHeaderIndices={[0, 1]}>

    <View>
      <View style={[styles.tr, styles.footer, { backgroundColor: colors.surface }]}>
        <Paragraph style={[fonts.head.medium, { textTransform: 'uppercase' }]}>Preview Table</Paragraph>
        <View style={styles.tr}>
          <Paragraph style={fonts.head.medium}>{fromNo+1}-{toNo} of {totalEntries}</Paragraph>
          <IconButton
            icon='chevron-left'
            onPress={() => onPageChange(page - 1)}
            disabled={page === 1} />
          <IconButton
            icon='chevron-right'
            onPress={() => onPageChange(page + 1)}
            disabled={page === totalPages} />
        </View>
      </View>
    </View>
    
    <View>
      <View style={[styles.tr, styles.thead, { backgroundColor: colors.surface }]}>
        <Paragraph style={[styles.td, styles.th]}>Name</Paragraph>
        <Paragraph style={[styles.td, styles.th]}>New Name</Paragraph>
        <Paragraph style={[styles.tdDense, styles.th]}>Modified On</Paragraph>
      </View>
      <Divider />
    </View>

    {
      entries.map((item, i) => (
        <React.Fragment key={i}>
          <View style={styles.tr}>
            <Caption style={styles.td}>{item.name}</Caption>
            <Caption style={styles.td}>{newNames[i]}</Caption>
            <Caption style={styles.tdDense}>{(new Date(item.mtime).toISOString())}</Caption>
          </View>
          <Divider />
        </React.Fragment>
      ))
    }
    
  </ScrollView>
)


export const PreviewTable = ({ colors, refs, fonts, entries }) => {
  
  const formParams = RefsToValues(refs);
  const entriesPerPage = 10;
  const totalPages = Math.ceil(entries.length / entriesPerPage);
  const [newNames, updateNewNames] = React.useState([]);
  const [page, changePage] = React.useState(1);
  const fromNo = (page - 1) * entriesPerPage;
  const toNo = page * entriesPerPage > entries.length ? entries.length : page * entriesPerPage;


  // Update the names whenever the page change happens
  React.useEffect(() => {
    const toBeNames = entries
      .slice((page-1) * entriesPerPage, page * entriesPerPage)
      .map(entry => ExecuteOperations(formParams, entry.name));

    updateNewNames(toBeNames);
  }, [page]);

  
  return !newNames.length
    ? <Button loading mode='text' color={colors.primary} />
    : (
      <ScrollView horizontal={true} style={{ marginTop: 16 }}>
        <TableView
          colors={colors}
          fonts={fonts}
          entries={entries.slice((page-1) * entriesPerPage, page * entriesPerPage)}
          newNames={newNames}
          totalPages={totalPages}
          totalEntries={entries.length}
          page={page}
          fromNo={fromNo}
          toNo={toNo}
          onPageChange={changePage} />
      </ScrollView>
    )
}

