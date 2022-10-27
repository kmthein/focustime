import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration } from "react-native"
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  }

  return (
  <View style={styles.container}>
    <View style={styles.countdown}>
      <Countdown minutes={minutes} isPaused={!isStarted} onEnd={onEnd} onProgress={setProgress} />
    <View style={{ paddingTop: spacing.xxl }}>
      <Text style={styles.title}>Focusing on:</Text>
      <Text style={styles.task}>{focusSubject}</Text> 
    </View>
    </View>
    <View>
      <ProgressBar progress={progress} color={colors.progressBar} style={{height: spacing.sm}}/>
    </View>
    <View style={styles.timingWrapper}> 
      <Timing onChangeTime={setMinutes} /> 
    </View>
    <View style={styles.buttonWrapper}>
    {!isStarted && 
      <RoundedButton title='start' onPress={() => setIsStarted(true)} /> }
    {isStarted && 
      <RoundedButton title='pause' onPress={() => setIsStarted(false)} /> }
    </View>
    <View style={styles.clearButtonWrapper}>
      <RoundedButton size={50} title='-' onPress={clearSubject} />
    </View>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: 'row',
  },  
  clearButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  }
});