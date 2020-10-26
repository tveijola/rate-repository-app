import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';

import RepositoryListContainer from './RepositoryListContainer';
import { useHistory } from 'react-router-native';

const RepositoryList = () => {

  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedValue] = useDebounce(searchQuery, 500);

  const variables = {
    orderBy: sortBy === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE'
  };

  if (variables.orderBy === 'RATING_AVERAGE') {
    variables.orderDirection = sortBy === 'highrating' ? 'DESC' : 'ASC';
  }

  if (searchQuery) {
    variables.searchKeyword = debouncedValue;
  }

  variables.first = 8;

  const { repositories, fetchMore } = useRepositories(variables);

  const history = useHistory();

  const onPress = (id) => {
    history.push(`/${id}`);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPress={onPress} onEndReach={onEndReach}
      sortBy={sortBy} setSortBy={setSortBy}
      searchQuery={searchQuery} setSearchQuery={setSearchQuery}
    />
  );

};

export default RepositoryList;
