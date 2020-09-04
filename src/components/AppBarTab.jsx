import React from 'react';
import Text from './Text';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tab: {
    margin: 10,
  }
});

const AppBarTab = ({ tabText }) => {
  return (
    <TouchableWithoutFeedback>
      <Text
        color='textAppBarTab'
        style={styles.tab}
        fontSize='appBarTab'
      >
        {tabText}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;