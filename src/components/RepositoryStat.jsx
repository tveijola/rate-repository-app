import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import formatDisplayNumber from '../utils/formatDispalyNumber';

const styles = StyleSheet.create({
  flexColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    marginBottom: 10,
    alignItems: 'center'
  }
});

const RepositoryStat = ({ label, stat, testID }) => {
  return (
    <View style={styles.flexColumnContainer}>
      <Text fontWeight='bold' testID={testID}>{formatDisplayNumber(stat)}</Text>
      <Text>{label}</Text>
    </View>
  );
};

export default RepositoryStat;