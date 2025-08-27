import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  inputAccessoryViewID?: string;
};

export const DurationInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  inputAccessoryViewID,
}) => {
  return (
    <View style={styles.durationBox}>
      <Text style={styles.durationLabel}>{label}</Text>
      <TextInput
        keyboardType="number-pad"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        maxLength={2}
        placeholder="0"
        placeholderTextColor="#6b7280"
        inputAccessoryViewID={inputAccessoryViewID}
        returnKeyType="done"
        blurOnSubmit
      />
      <Text style={styles.secondsLabel}>sec</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  durationBox: {
    flex: 1,
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  durationLabel: {
    color: "#9ca3af",
    marginBottom: 6,
  },
  input: {
    color: "white",
    backgroundColor: "#0f172a",
    width: "100%",
    textAlign: "center",
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 18,
  },
  secondsLabel: {
    color: "#6b7280",
    marginTop: 6,
    fontSize: 12,
  },
});
