// components/form-field.tsx
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface FormFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
	onBlur?: () => void;
    error?: string;
    placeholder?: string;
    multiline?: boolean;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export default function FormField({ label, value, onChangeText, onBlur, error, placeholder, multiline = false, autoCapitalize = "sentences" }: FormFieldProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={[styles.input, multiline && styles.multiline, error && styles.inputError]} value={value} onChangeText={onChangeText} onBlur={onBlur} placeholder={placeholder} placeholderTextColor="#94A3B8" multiline={multiline} autoCapitalize={autoCapitalize} />
            {/* Only render the error line when there is an error */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#334155",
        marginBottom: 6,
    },
    input: {
        backgroundColor: "#F1F5F9",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        color: "#1E293B",
        borderWidth: 1,
        borderColor: "transparent",
    },
    multiline: {
        minHeight: 80,
        textAlignVertical: "top",
    },
    inputError: {
        borderColor: "#EF4444",
        backgroundColor: "#FEF2F2",
    },
    errorText: {
        fontSize: 11,
        color: "#DC2626",
        marginTop: 4,
    },
});
