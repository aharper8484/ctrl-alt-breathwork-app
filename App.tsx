import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  InputAccessoryView,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Visualizer } from "./src/components/Visualizer";
import {
  useBreathTimer,
  BreathPhase,
  Durations,
} from "./src/hooks/useBreathTimer";
import { DurationInput } from "./src/components/DurationInput";
import { PrimaryButton, SecondaryButton } from "./src/components/Buttons";
import {
  DEFAULT_DURATIONS,
  MIN_SECONDS,
  MAX_SECONDS,
} from "./src/constants/breath";
import { parseSeconds } from "./src/utils/number";

export default function App() {
  const [durations, setDurations] = useState<Durations>(DEFAULT_DURATIONS);
  const { phase, remainingSeconds, isRunning, start, pause, reset } =
    useBreathTimer(durations);

  const phaseLabel = useMemo(() => {
    switch (phase) {
      case "inhale":
        return "Inhale";
      case "hold":
        return "Hold";
      case "exhale":
        return "Exhale";
      default:
        return "";
    }
  }, [phase]);

  const handleChange = (key: keyof Durations, value: string) => {
    const num = parseSeconds(value, MIN_SECONDS, MAX_SECONDS);
    setDurations((prev) => ({ ...prev, [key]: num }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Breathwork</Text>
        <Text style={styles.subtitle}>Customize inhale / hold / exhale</Text>
      </View>

      <Visualizer phase={phase} />

      <View style={styles.readout}>
        <Text style={styles.phase}>{phaseLabel}</Text>
        <Text style={styles.timer}>{remainingSeconds}s</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        keyboardVerticalOffset={
          Platform.select({ ios: 64, android: 0 }) as number
        }
      >
        <View style={styles.controlsRow}>
          <DurationInput
            label="Inhale"
            value={String(durations.inhale)}
            onChange={(v) => handleChange("inhale", v)}
            inputAccessoryViewID="doneAccessory"
          />
          <View style={styles.spacerHorizontal} />
          <DurationInput
            label="Hold"
            value={String(durations.hold)}
            onChange={(v) => handleChange("hold", v)}
            inputAccessoryViewID="doneAccessory"
          />
          <View style={styles.spacerHorizontal} />
          <DurationInput
            label="Exhale"
            value={String(durations.exhale)}
            onChange={(v) => handleChange("exhale", v)}
            inputAccessoryViewID="doneAccessory"
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.buttonsRow}>
        {isRunning ? (
          <PrimaryButton label="Pause" onPress={pause} />
        ) : (
          <PrimaryButton label="Start" onPress={start} />
        )}
        <SecondaryButton label="Reset" onPress={reset} />
      </View>

      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID="doneAccessory">
          <View style={styles.accessoryBar}>
            <Pressable
              onPress={Keyboard.dismiss}
              style={styles.accessoryButton}
            >
              <Text style={styles.accessoryText}>Done</Text>
            </Pressable>
          </View>
        </InputAccessoryView>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Tip: Try 4-4-6 or 4-7-8 patterns</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1221",
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: 4,
  },
  readout: {
    alignItems: "center",
    marginTop: 12,
  },
  phase: {
    color: "#cbd5e1",
    fontSize: 18,
    marginBottom: 4,
  },
  timer: {
    color: "white",
    fontSize: 40,
    fontWeight: "800",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  spacerHorizontal: {
    width: 12,
  },
  accessoryBar: {
    backgroundColor: "#111827",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#334155",
    alignItems: "flex-end",
  },
  accessoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#2563eb",
    borderRadius: 8,
  },
  accessoryText: {
    color: "white",
    fontWeight: "700",
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    color: "#64748b",
    fontSize: 12,
  },
});
