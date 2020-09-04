import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <AppBarTab tabText='Repositories' path='/' />
    <AppBarTab tabText='Sign In' path='/signin'/>
  </View>;
};

export default AppBar;