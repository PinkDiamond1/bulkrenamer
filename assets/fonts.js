const fonts = {
  regular: { fontFamily: 'Rubik-Regular', fontWeight: 'normal', },
  medium: { fontFamily: 'Rubik-Medium', fontWeight: 'normal' },
  light: { fontFamily: 'Rubik-Light', fontWeight: 'normal', },
  thin: { fontFamily: 'Rubik-Light', fontWeight: 'normal', },
  head: {
    regular: { fontFamily: 'OpenSans-Regular' },
    bold: { fontFamily: 'OpenSans-Bold' },
    light: { fontFamily: 'OpenSans-Light' },
    medium: { fontFamily: 'OpenSans-SemiBold' },
  }
}

const fontConfig = { web: fonts, ios: fonts, android: fonts, };
export default fontConfig;