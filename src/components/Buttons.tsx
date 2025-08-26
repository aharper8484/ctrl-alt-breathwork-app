import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
};

export const PrimaryButton: React.FC<ButtonProps> = ({ label, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      styles.primaryButton,
      pressed && styles.pressed,
    ]}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </Pressable>
);

export const SecondaryButton: React.FC<ButtonProps> = ({ label, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      styles.secondaryButton,
      pressed && styles.pressed,
    ]}
  >
    <Text style={styles.buttonText}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
  },
  secondaryButton: {
    backgroundColor: "#334155",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.9,
  },
});
