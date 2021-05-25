import React from 'react';
import { TextInput, View } from 'react-native';
import { Portal, Dialog, Button, ProgressBar, Paragraph } from 'react-native-paper';


/**
 * TestStringDialog
 * This component is used to edit the string of TestPreview.
 * It shows a fixed dialog to edit the string
 * @returns JSX
 */
export const ProgressDialog = React.memo(({ visible, iptRef, colors }) => {

  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>
        <Dialog.Title>Renaming files...</Dialog.Title>
        <Dialog.Content style={{ marginTop: -4 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Paragraph style={{ fontSize: 16, alignSelf: 'center', color: colors.text }}>
              Rename Progress
            </Paragraph>
            <TextInput
              ref={iptRef}
              defaultValue='0%'
              editable={false}
              textAlign='right'
              style={{ fontSize: 16, letterSpacing: 0.25, color: colors.text }} />
          </View>
          <ProgressBar indeterminate={true} style={{ marginTop: 8 }} />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}, (prevProps, nextProps) => (
  prevProps.visible === nextProps.visible
));