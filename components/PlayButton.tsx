import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppColor from "../theme/color";
import AppFont from "../theme/fonts";

const PlayButton = ({
  isPaused,
  onPress,
}: {
  isPaused: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable style={{ alignItems: "center" }} onPress={onPress}>
      <View style={styles.icon}>
        <Ionicons
          size={28}
          color={AppColor.main}
          name={!isPaused ? "play" : "pause-outline"}
        />
      </View>
      <Text style={styles.txtButton}>{isPaused ? "PAUSE" : "PLAY"}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    borderWidth: 1,
    borderColor: AppColor.main,
    borderRadius: 100,
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  txtButton: {
    marginTop: 2,
    color: AppColor.main,
    fontSize: 20,
    fontFamily: AppFont.main,
  },
});

export default PlayButton;
