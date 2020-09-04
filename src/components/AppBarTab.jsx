import React from 'react';
import Text from './Text';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    margin: 10,
  }
});

const AppBarTab = ({ tabText, path }) => {
  return (
    <Link to={path} component={TouchableHighlight} activeOpacity={0.8}>
      <Text
        color='textAppBarTab'
        style={styles.tab}
        fontSize='appBarTab'
      >
        {tabText}
      </Text>
    </Link>
  );
};

export default AppBarTab;