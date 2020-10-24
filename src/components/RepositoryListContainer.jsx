import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;
class RepositoryListContainer extends React.Component {

  renderHeader = () => {

    const { sortBy, setSortBy, searchQuery, setSearchQuery } = this.props;
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
      <View style={styles.headerContainer}>
        <Searchbar
          placeholder='Search'
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
        <RNPickerSelect
          onValueChange={(value) => onSelect(value)}
          value={sortBy}
          items={items}
        />
      </View>
    );
  };

  render() {

    const { repositories, onPress, onEndReach } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => onPress(item.id)}>
            <RepositoryItem repository={item} displayLinkButton={false} />
          </TouchableOpacity>
        }
        keyExtractor={item => item.id}
      />
    );
  }
}

export default RepositoryListContainer;