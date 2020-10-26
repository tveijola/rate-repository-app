import React from 'react';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';
import useSingleRepository from '../hooks/useSingleRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';

const flexRowContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
};

const flexColumnContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
};

const styles = StyleSheet.create({
  flexMainContainer: {
    ...flexRowContainer,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  flexRatingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    margin: 10
  },
  flexReviewContainer: {
    ...flexColumnContainer,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    margin: 10,
    flexShrink: 1
  },
  ratingText: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.ratingNumber
  },
  usernameText: {
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts.main
  },
  dateText: {
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.main,
    paddingBottom: 5
  },
  contentText: {
    fontFamily: theme.fonts.main
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem repository={repository} displayLinkButton={true} />
      <ItemSeparator />
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.flexMainContainer}>
      <View style={styles.flexRatingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.flexReviewContainer}>
        <Text style={styles.usernameText}>{review.user.username}</Text>
        <Text style={styles.dateText}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.contentText}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useSingleRepository({ id, first: 6 });

  if (!repository) return <Text>Loading...</Text>;

  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];
  
  return (
    <FlatList
      data={reviewNodes}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepositoryView;
