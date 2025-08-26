import React, { useEffect, useMemo, useRef } from "react";
import { View, Animated, Easing, StyleSheet, Text } from "react-native";
import type { BreathPhase, Durations } from "../hooks/useBreathTimer";

type Props = {
  phase: BreathPhase;
  durations: Durations;
  remainingSeconds: number;
};

export const Visualizer: React.FC<Props> = ({
  phase,
  durations,
  remainingSeconds,
}) => {
  const scale = useRef(new Animated.Value(0.6)).current;

  const targetScale = useMemo(() => {
    switch (phase) {
      case "inhale":
        return 1.0;
      case "hold":
        return 1.0;
      case "exhale":
        return 0.6;
      default:
        return 0.8;
    }
  }, [phase]);

  const durationMs = useMemo(() => {
    const total = durations[phase] || 1;
    return Math.max(300, total * 1000);
  }, [durations, phase]);

  useEffect(() => {
    Animated.timing(scale, {
      toValue: targetScale,
      duration: durationMs,
      easing: phase === "hold" ? Easing.linear : Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [durationMs, phase, scale, targetScale]);

  const color =
    phase === "inhale" ? "#22d3ee" : phase === "hold" ? "#a78bfa" : "#34d399";

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.circle,
          { transform: [{ scale }], shadowColor: color, borderColor: color },
        ]}
      />
      <Text style={[styles.helper, { color }]}>
        {phase === "inhale"
          ? "Breathe in"
          : phase === "hold"
          ? "Hold"
          : "Breathe out"}
      </Text>
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
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
  },
  helper: {
    marginTop: 12,
    fontSize: 16,
  },
});
