import { PermissionsAndroid } from 'react-native';

export const RequestPermissions = async (perms) => {
  try {

    const permsGrants = await PermissionsAndroid.requestMultiple(perms);
    if (perms.every(perm => (
      permsGrants[perm] === PermissionsAndroid.RESULTS.GRANTED))) {
      return (new Promise(res => res(true)));
    }

  } catch (err) {
    console.warn(err);
    return (new Promise(res => res(false)));
  }
};
