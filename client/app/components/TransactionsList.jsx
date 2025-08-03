import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import TransactionListItem from './TransactionListItem';
const TransactionsList = () => {
  const { allTransactions } = useSelector((state) => state.transactions);

  return (
    <View style={styles.container}>
      <FlatList
        data={allTransactions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TransactionListItem item={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default TransactionsList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  listContent: {
    paddingBottom: 100,
  },
});
