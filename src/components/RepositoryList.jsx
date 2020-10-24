import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortSelector = ({ sortBy, setSortBy }) => {

  const items = [
    { label: 'Latest repositories', value: 'latest' },
    { label: 'Highest rated repositories', value: 'highrating' },
    { label: 'Lowest rated repositories', value: 'lowrating' },
  ];

  const onSelect = (value) => {
    if (value) {
      setSortBy(value);
    }
  };

  return (
    <RNPickerSelect
      onValueChange={(value) => onSelect(value)}
      value={sortBy}
      items={items}
    />
  );
};

const RepositoryListContainer = ({ repositories, sortBy, setSortBy }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const history = useHistory();

  const onPress = (id) => {
    history.push(`/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => SortSelector({ sortBy, setSortBy })}
      renderItem={({ item }) =>
        <TouchableOpacity onPress={() => onPress(item.id)}>
          <RepositoryItem repository={item} displayLinkButton={false} />
        </TouchableOpacity>
      }
      keyExtractor={item => item.id}
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState('latest');
  const { repositories } = useRepositories(sortBy);
  return <RepositoryListContainer repositories={repositories} sortBy={sortBy} setSortBy={setSortBy} />;
};

export default RepositoryList;
