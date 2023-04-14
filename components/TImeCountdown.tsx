import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AppColor from "../theme/color";
import AppFont from "../theme/fonts";

interface TimeCountdownProps {
  editable: boolean;
  title: string;
  value: string;
  onChangeText: (val: string) => void;
  maxLength?: number;
}

const TimeCountdown = ({
  editable,
  title,
  value,
  maxLength = 2,
  onChangeText,
}: TimeCountdownProps) => {
  return (
    <View style={styles.containerTime}>
      <TextInput
        editable={editable}
        style={styles.inputStyle}
        keyboardType="numeric"
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
      />
      <Text style={styles.txtTime}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerTime: {
    alignItems: "center",
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  inputStyle: {
    color: AppColor.main,
    fontSize: 42,
    fontWeight: "100",
    fontFamily: AppFont.main,
  },
  txtTime: {
    color: AppColor.main,
    fontWeight: "100",
    fontSize: 18,
    fontFamily: AppFont.main,
  },
});

export default TimeCountdown;
