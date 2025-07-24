import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import TransactionListItem from "./TransactionListItem";
const TransactionsList = () => {
  const { allTransactions } = useSelector((state) => state.transactions);

  return (
    <FlatList
      data={allTransactions}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <TransactionListItem transaction={item} />}
    />
  );
};

export default TransactionsList;
