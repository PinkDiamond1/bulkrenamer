import React from 'react';
import { ScrollView, ToastAndroid, View } from 'react-native';
import { Button, Portal, Snackbar, useTheme } from 'react-native-paper';

import Strings from '@store/strings';
import { ActionTypes } from '@store/store';
import { Dashboard } from './Dashboard';
import { Form } from './Form';
import { BottomBar } from './BottomBar';
import { TestPreview } from './TestPreview';
import { TestStringDialog } from './TestStringDialog';
import { ProgressDialog } from './ProgressDialog';


/**
 * FormScreen
 * This functional component adds all the components for the form like TestPreview component,
 * FormCards, BottomBar and Dashboard
 * @param {props} contains state, and navigation props
 * @returns 
 */
export const FormScreen = ({ state, dispatch, navigation }) => {
  
  const { colors, styles } = useTheme();
  const progressRef = React.useRef();
  const [preview, togglePreview] = React.useState(false);
  const [dialog, toggleDialog] = React.useState(false);
  const [testString, setTestString] = React.useState(Strings.TEST_STRING);
  const [testOutput, updateTestOpt] = React.useState(Strings.TEST_STRING);
  const [progress, toggleProgressDialog] = React.useState(false);

  // Compute the value of dry run and update the result view
  const computeTestPreviewResult = () => {
    dispatch({
      type: ActionTypes.TEST_PREVIEW,
      string: testString,
      onSuccess: (res) => updateTestOpt(res),
    })
  };

  // Update the test string output on component update if testString is updated
  React.useEffect(computeTestPreviewResult, [testString]);

  // Update the component on test preview update
  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: preview ? colors.surface : colors.background,
        elevation: 0,
      }
    });
  }, [preview]);

  return (
    <React.Fragment>
      {
        dialog
        && (
          <TestStringDialog
            initString={testString}
            onDismiss={() => toggleDialog(false)}
            onUpdate={(str) => { setTestString(str); toggleDialog(false); }} />
        )
      }
      <ProgressDialog visible={progress} iptRef={progressRef} colors={colors} />
      <TestPreview
        colors={colors}
        testString={testString}
        testOutput={testOutput}
        onRun={computeTestPreviewResult}
        onPressEdit={() => toggleDialog(true)}
        isVisible={preview} />

      <ScrollView style={{ ...styles.container, color: colors.background }}>
        <Dashboard state={state} colors={colors} />
        <Form state={state} dispatch={dispatch} />

        <Button
          mode='contained'
          icon='play'
          disabled={state.entries.length === 0}
          style={{ marginTop: 16, backgroundColor: colors.accent }}
          contentStyle={{ margin: 8 }}
          onPress={() => {
            toggleProgressDialog(true);
            dispatch({
              type: ActionTypes.EXECUTE,
              onUpdate: (val) => { progressRef.current.setNativeProps({ text: val + '%' }) },
              onSuccess: (errFiles) => {
                toggleProgressDialog(false);
                ToastAndroid.show(
                  (state.entries.length - errFiles.length) + ' file(s) have been renamed.',
                  ToastAndroid.LONG);
              }
            });
          }}>
          Start Renaming
        </Button>

        <View style={{ height: 120 }} />
      </ScrollView>
      
      <BottomBar
        colors={colors}
        preview={preview}
        navigation={navigation}
        onToggle={() => togglePreview(!preview)} />

    </React.Fragment>
  );
};
