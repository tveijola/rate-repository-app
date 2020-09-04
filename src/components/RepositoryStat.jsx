import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';

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

const RepositoryStat = ({ label, stat }) => {
  if (stat > 1000) {
    stat = `${(stat / 1000).toFixed(1)}k`;
  }

  return (
    <View style={styles.flexColumnContainer}>
      <Text fontWeight='bold'>{stat}</Text>
      <Text>{label}</Text>
    </View>
  );
};

export default RepositoryStat;