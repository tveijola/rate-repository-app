import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textLight: '#f1f2f3',
    textAppBarTab: '#d9d9d9',
    primary: '#0366d6',
    appBarBackground: '#24292e',
    error: '#ff1a1a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    appBarTab: 18
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;