import React, { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { BreathPhase } from "../hooks/useBreathTimer";

type Props = {
  phase: BreathPhase;
};

export const Visualizer: React.FC<Props> = ({ phase }) => {
  const color = useMemo(
    () =>
      phase === "inhale" ? "#22d3ee" : phase === "hold" ? "#a78bfa" : "#34d399",
    [phase]
  );
  const label =
    phase === "inhale"
      ? "Breathe in"
      : phase === "hold"
      ? "Hold"
      : "Breathe out";
  return (
    <View style={styles.wrapper}>
      <View style={[styles.circle, { borderColor: color }]} />
      <Text style={[styles.helper, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 3,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  helper: {
    marginTop: 12,
    fontSize: 16,
  },
});
