import React, { useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, Text, Animated, Easing } from "react-native";
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

  const fillAnim = useRef(new Animated.Value(0)).current; // 0..1
  const pulseAnim = useRef(new Animated.Value(1)).current; // scale

  const fillTarget = useMemo(() => {
    // Ensure: start of inhale shows empty (0), end of inhale shows full (1).
    // Ensure: start of exhale shows full (1), end of exhale shows empty (0).
    if (phase === "inhale") {
      const total = Math.max(1, durations.inhale || 1);
      const remaining = Math.max(1, Math.floor(remainingSeconds || 1));
      if (remaining >= total) return 0; // start empty regardless of value
      const denom = Math.max(1, total - 1);
      const elapsedWholeSeconds = total - remaining;
      const progress = elapsedWholeSeconds / denom; // when remaining==1 -> 1
      return Math.min(1, Math.max(0, progress));
    }
    if (phase === "hold") return 1;
    const total = Math.max(1, durations.exhale || 1);
    const remaining = Math.max(1, Math.floor(remainingSeconds || 1));
    if (remaining >= total) return 1; // start full at exhale start
    const denom = Math.max(1, total - 1);
    const progressDown = (remaining - 1) / denom; // when remaining==1 -> 0
    return Math.min(1, Math.max(0, progressDown));
  }, [durations.exhale, durations.inhale, phase, remainingSeconds]);

  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: fillTarget,
      duration: 900,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [fillAnim, fillTarget]);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.06,
        duration: 160,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 220,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [pulseAnim, remainingSeconds]);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[
          styles.circle,
          { borderColor: color, transform: [{ scale: pulseAnim }] },
        ]}
      >
        <View style={styles.fillClip}>
          {phase === "exhale" ? (
            <Animated.View
              style={[
                styles.fill,
                styles.fillTop,
                {
                  backgroundColor: color,
                  height: Animated.multiply(fillAnim, 220),
                },
              ]}
            />
          ) : (
            <Animated.View
              style={[
                styles.fill,
                styles.fillBottom,
                {
                  backgroundColor: color,
                  height: Animated.multiply(fillAnim, 220),
                },
              ]}
            />
          )}
        </View>
      </Animated.View>
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
  fillClip: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    height: 220,
    borderBottomLeftRadius: 110,
    borderBottomRightRadius: 110,
    borderTopLeftRadius: 110,
    borderTopRightRadius: 110,
  },
  fill: {
    width: "100%",
  },
  fillBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  fillTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  helper: {
    marginTop: 12,
    fontSize: 16,
  },
});
