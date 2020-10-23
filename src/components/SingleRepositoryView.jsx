import React from 'react';
import { useParams } from 'react-router-native';
import useSingleRepository from '../hooks/useSingleRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository } = useSingleRepository(id);
  
  if (!repository) return <Text>Loading...</Text>;
  return <RepositoryItem repository={repository} displayLinkButton={true} />;
};

export default SingleRepositoryView;
