import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/screens/components/redux/store";
import FilterScreen from "./src/screens/FilterScreen";
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.sectionContainer}>
        <FilterScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: "pink",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});
