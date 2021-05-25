import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  emptyDirContainer: {
    alignItems: 'center',
    height: Dimensions.get('screen').height - 72,
    justifyContent: 'center',
    marginTop: -72,
  }
});

export default styles;