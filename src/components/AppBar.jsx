import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@apollo/react-hooks';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground
  }
});

const AppBar = () => {

  const { loading, data } = useQuery(GET_AUTHORIZED_USER);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const authTab = data.authorizedUser
    ? { tabText: 'Sign Out', path: '/signout' }
    : { tabText: 'Sign In', path: '/signin' };

  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab tabText='Repositories' path='/' />
      { data.authorizedUser ? <AppBarTab tabText='Create a review' path='/createreview' /> : null }
      { data.authorizedUser ? <AppBarTab tabText='My reviews' path='/myreviews' /> : null }
      <AppBarTab tabText={authTab.tabText} path={authTab.path} />
      { data.authorizedUser ? null : <AppBarTab tabText='Sign Up' path='/signup' /> }
    </ScrollView>
  </View>;
};

export default AppBar;