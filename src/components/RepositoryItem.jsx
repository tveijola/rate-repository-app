import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';
import RepositoryStat from './RepositoryStat';
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
    ...flexColumnContainer,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  flexImageAndTitleContainer: {
    ...flexRowContainer,
    justifyContent: 'flex-start',
    margin: 10,
    padding: 5,
  },
  flexTitleContainer: {
    ...flexColumnContainer,
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    flexShrink: 1,
  },
  flexStatContainer: {
    ...flexRowContainer,
    justifyContent: 'space-evenly',
  },
  flexImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  flexItem: {
    flexGrow: 1,
    marginBottom: 5,
  },
  flexLanguageItem: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5
  },
  githubLink: {
    margin: 15,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: theme.colors.primary
  }
});

const RepositoryItem = ({ repository, displayLinkButton }) => {

  const onPress = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={styles.flexMainContainer}>
      <View style={styles.flexImageAndTitleContainer}>
        <Image
          style={styles.flexImage}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.flexTitleContainer}>
          <Text style={styles.flexItem} fontWeight='bold' fontSize='subheading' testID="repoFullName">
            {repository.fullName}
          </Text>
          <Text style={styles.flexItem} testID="repoDescription">
            {repository.description}
          </Text>
          <Text style={styles.flexLanguageItem} color='textLight' testID="repoLanguage">
            {repository.language}
          </Text>
        </View>
      </View>
      <View style={styles.flexStatContainer}>
        <RepositoryStat
          label='Stars'
          stat={repository.stargazersCount}
          testID="repoStars" />
        <RepositoryStat
          label='Forks'
          stat={repository.forksCount}
          testID="repoForks" />
        <RepositoryStat
          label='Reviews'
          stat={repository.reviewCount}
          testID="repoReviews" />
        <RepositoryStat
          label='Rating'
          stat={repository.ratingAverage}
          testID="repoRating" />
      </View>
      {
        displayLinkButton
          ?
          <View style={styles.githubLink} >
            <TouchableOpacity onPress={onPress}>
              <Text style={{ color: theme.colors.textLight }}>Open in GitHub</Text>
            </TouchableOpacity>
          </View>
          : null
      }
    </View>
  );
};

export default RepositoryItem;
