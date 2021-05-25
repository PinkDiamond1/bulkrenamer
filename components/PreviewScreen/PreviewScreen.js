import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme as usePaperTheme } from 'react-native-paper';

import Styles from '@assets/styles';
import { StoreContext } from '@store/store';
import { Summary } from './Summary';
import { PreviewTable } from './PreviewTable';


export const PreviewScreen = ({  }) => {

  const [state, _] = React.useContext(StoreContext);
  const { colors, fonts } = usePaperTheme();

  return (
    <View style={Styles.container}>
      <Summary
        colors={colors} fonts={fonts}
        entries={state.entries}
        path={state.directoryPath} />

      {
        state.entries.length 
        ? (
          <PreviewTable
            colors={colors} fonts={fonts}
            refs={state.refs}
            entries={state.entries} />
        ) : undefined
      }
    </View>
  )
}