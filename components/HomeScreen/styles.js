import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  inlineInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  bottomBar: {
    position: 'absolute',
    marginTop: 16,
    paddingHorizontal: 16,
    left: 0,
    bottom: -8,
    width: Dimensions.get('screen').width,
    elevation: 5,
  },
  bottomBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  testViewText: {
    marginTop: 8,
    flexShrink: 1,
  }
});

export default styles;