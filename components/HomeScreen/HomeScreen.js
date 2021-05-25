import React from 'react';
import { PermissionsAndroid, ToastAndroid } from 'react-native';
import { FAB } from 'react-native-paper';

import { StoreContext } from '@store/store';
import { RequestPermissions } from '@store/permissions';
import { FormScreen } from './FormScreen';


/**
 * Check for Permission and navigate to another Screen
 * @param {Object} navigation is used to navigate to FileSystemView if allowed
 */
const checkPermissionsAndRedirect = (navigation) => {
  const permissions = [
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ];
  
  RequestPermissions(permissions).then(res => {
    if (res) navigation.navigate('FileSystemView')
    else ToastAndroid.show('Permission denied.', ToastAndroid.SHORT);
  });
}


/**
 * HomeScreen
 * Functional component which is the landing page of the app. It creates the form.
 * @param {Object} param0 contains the navigation used to navigate to FileSystemView
 *                        if the permissions are given
 * @returns JSX
 */
export const HomeScreen = ({ navigation }) => {

  const [state, dispatch] = React.useContext(StoreContext);  
  return (
    <React.Fragment>
      <FormScreen state={state} dispatch={dispatch} navigation={navigation} />
      <FAB
        icon='folder'
        style={{ position: 'absolute', bottom: 32, right: 16 }}
        onPress={() => checkPermissionsAndRedirect(navigation)} />
    </React.Fragment>
  );
}
