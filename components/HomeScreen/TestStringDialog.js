import React from 'react';
import { Portal, Dialog, Button, TextInput } from 'react-native-paper';


/**
 * TestStringDialog
 * This component is used to edit the string of TestPreview.
 * It shows a fixed dialog to edit the string
 * @returns JSX
 */
export const TestStringDialog = React.memo(({ initString, onDismiss, onUpdate }) => {

  const ref = React.useRef();
  return (
    <Portal>
      <Dialog visible={true} onDismiss={onDismiss}>
        <Dialog.Title>Edit Test String</Dialog.Title>

        <Dialog.Content>
          <TextInput mode='outlined' label='Test String' ref={ref} />
        </Dialog.Content>

        <Dialog.Actions style={{ marginRight: 16, marginTop: -8 }}>
          <Button onPress={onDismiss} uppercase={true}>Cancel</Button>
          <Button
            uppercase={true}
            onPress={() => (
              ref.current?.state?.value ? onUpdate(ref.current.state.value) : onDismiss()
            )}>OK</Button>
        </Dialog.Actions>

      </Dialog>
    </Portal>
  );
}, (prevProps, nextProps) => (
  prevProps.initString === nextProps.initString
));