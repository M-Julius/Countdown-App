import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppFont from "../theme/fonts";

const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          marginTop: insets.top + 5,
        },
      ]}
    >
      <Entypo name="menu" size={24} color={"white"} style={{ flex: 1 }} />
      <Text style={styles.title}>Before Go-live</Text>
      <View style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 18, color: "white", fontFamily: AppFont.main },
});

export default Header;
