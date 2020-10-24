import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';

import RepositoryListContainer from './RepositoryListContainer';
import { useHistory } from 'react-router-native';

const RepositoryList = () => {

  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedValue] = useDebounce(searchQuery, 500);
  const { repositories } = useRepositories(sortBy, debouncedValue);

  const history = useHistory();

  const onPress = (id) => {
    history.push(`/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPress={onPress}
      sortBy={sortBy} setSortBy={setSortBy}
      searchQuery={searchQuery} setSearchQuery={setSearchQuery}
    />
  );

};

export default RepositoryList;
