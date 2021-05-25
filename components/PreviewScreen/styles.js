import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  datatable: {
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  tr: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  td: {
    width: 256,
    flexShrink: 1,
  },
  tdDense: {
    flexShrink: 1,
    width: 160,
  },
  th: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 0,
    justifyContent: 'space-between',
  },
  thead: {
    marginTop: -8,
    paddingVertical: 16,
  }
});

export default styles;