import React from 'react';
import { FlatList, View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { format } from 'date-fns';
import useGetAuthorizedUser from '../hooks/useGetAuthorizedUser';
import theme from '../theme';
import Text from './Text';
import { useHistory } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const flexRowContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  backgroundColor: 'white',
};

const flexColumnContainer = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
};

const styles = StyleSheet.create({
  flexMainContainer: {
    ...flexRowContainer,
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
  flexButtonContainer: {
    ...flexRowContainer,
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
  button: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textLight,
    fontWeight: theme.fontWeights.bold,
    borderRadius: 4,
    textAlign: 'center',
    margin: 15,
    padding: 15,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, goToRepository, assertDeleteReview }) => {
  return (
    <View style={flexColumnContainer}>
      <View style={styles.flexMainContainer}>
        <View style={styles.flexRatingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.flexReviewContainer}>
          <Text style={styles.usernameText}>{review.repository.fullName}</Text>
          <Text style={styles.dateText}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={styles.contentText}>{review.text}</Text>
        </View>
      </View>
      <View style={styles.flexButtonContainer}>
        <TouchableWithoutFeedback onPress={() => goToRepository(review.repositoryId)}>
          <Text style={styles.button}>
            View repository
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => assertDeleteReview(review.id)}>
          <Text style={{ ...styles.button, backgroundColor: theme.colors.error }}>
            Delete Review
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const MyReviews = () => {

  const { authorizedUser, fetchMore, refetch } = useGetAuthorizedUser({ includeReviews: true, first: 6 });
  const [deleteReview] = useDeleteReview();
  const history = useHistory();

  const reviewNodes = authorizedUser
    ? authorizedUser.reviews.edges.map(edge => edge.node)
    : [];

  const goToRepository = (repositoryId) => {
    history.push(`/${repositoryId}`);
  };

  const assertDeleteReview = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteReview({ id });
            refetch();
          }
        }
      ]
    );
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} goToRepository={goToRepository} assertDeleteReview={assertDeleteReview} />}
      keyExtractor={({ id }) => id}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;