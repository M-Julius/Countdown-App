import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Header from "../components/Header";
import TimeCountdown from "../components/TImeCountdown";
import PlayButton from "../components/PlayButton";
import AppColor from "../theme/color";
import assets from "../assets";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AppFont from "../theme/fonts";

type TIME_TYPE = "hour" | "minute" | "second";

interface INPUT_TIME {
  hour?: string;
  minute?: string;
  second?: string;
}

const Countdown = () => {
  // state time
  const [time, setTime] = useState<INPUT_TIME>({
    hour: "12",
    minute: "00",
    second: "00",
  });
  // state paused
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // parsing time with format 00
  const parseTime = useCallback((timeSet: string) => {
    return (parseInt(timeSet!) - 1).toString().padStart(2, "0");
  }, []);

  // updating time countdown
  const updateTime = useCallback((newTime?: INPUT_TIME) => {
    setTime((prevTime) => ({
      ...prevTime,
      ...newTime,
    }));
  }, []);

  // set countdown
  const setCountdown = (interval: any) => {
    // handle second, minute, hour countdown
    if (time.second === "00") {
      if (time.minute === "00") {
        if (time.hour === "00") {
          // time clear
          clearInterval(interval);
        } else {
          // set hour
          updateTime({
            hour: parseTime(time.hour!),
            minute: "59",
            second: "59",
          });
        }
      } else {
        // set minute
        updateTime({
          minute: parseTime(time.minute!),
          second: "59",
          hour: time.hour?.padStart(2, "0"),
        });
      }
    } else {
      // set seconds
      updateTime({
        second: parseTime(time.second!),
        minute: time.minute?.padStart(2, "0"),
        hour: time.hour?.padStart(2, "0"),
      });
    }
  };

  // start/stop countdown
  useEffect(() => {
    let interval: any;

    if (!isPaused) {
      // interval countdown
      interval = setInterval(() => {
        setCountdown(interval);
      }, 1000);
    }

    // clear interval
    return () => clearInterval(interval);
  }, [time.hour, time.minute, time.second, isPaused]);

  const handleInput = useCallback((value: string, type: TIME_TYPE) => {
    // handle only numeric only
    if (/^\d*$/.test(value)) {
      updateTime({ [type]: value });
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent />
      <Image resizeMode="cover" source={assets.wave} style={styles.wave} />
      <View style={styles.container}>
        <Header />
        <View style={styles.containerCountdown}>
          <TimeCountdown
            editable={isPaused}
            value={time.hour!}
            maxLength={3}
            onChangeText={(val) => handleInput(val, "hour")}
            title="HOURS"
          />
          <Text style={styles.inputStyle}>:</Text>
          <TimeCountdown
            editable={isPaused}
            value={time.minute!}
            onChangeText={(val) => handleInput(val, "minute")}
            title="MINUTES"
          />
          <Text style={styles.inputStyle}>:</Text>
          <TimeCountdown
            editable={isPaused}
            value={time.second!}
            onChangeText={(val) => handleInput(val, "second")}
            title="SECONDS"
          />
        </View>
        <View style={styles.footer}>
          <Ionicons name="clipboard-outline" size={24} color={AppColor.main} />
          <PlayButton
            isPaused={!isPaused}
            onPress={() => setIsPaused(!isPaused)}
          />
          <Ionicons name="trash-outline" size={24} color={AppColor.main} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  inputStyle: {
    color: AppColor.main,
    fontSize: 42,
    fontWeight: "100",
    fontFamily: AppFont.main,
  },
  containerCountdown: { flexDirection: "row" },
  wave: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
    zIndex: 0,
  },
  footer: {
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
});

export default Countdown;
