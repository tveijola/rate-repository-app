import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextAppBarTab: {
    color: theme.colors.textAppBarTab,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextLight: {
    color: theme.colors.textLight,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeAppBarTab: {
    fontSize: theme.fontSizes.appBarTab,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textAppBarTab' && styles.colorTextAppBarTab,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'textLight' && styles.colorTextLight,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'appBarTab' && styles.fontSizeAppBarTab,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;