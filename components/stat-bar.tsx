// components/stat-bar.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StatBarProps {
    label: string;
    count: number;
    total: number;
    colour?: string;
}

export default function StatBar({ label, count, total, colour = "#0D9488" }: StatBarProps) {
    const pct = total === 0 ? 0 : Math.round((count / total) * 100);
    return (
        <View style={styles.row}>
            <Text style={styles.label} numberOfLines={1}>{label}</Text>
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${pct}%`, backgroundColor: colour }]} />
            </View>
            <Text style={styles.count}>{count} ({pct}%)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: { marginBottom: 14 },
    label: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 4 },
    track: { height: 10, backgroundColor: "#F1F5F9", borderRadius: 5, overflow: "hidden", marginBottom: 3 },
    fill: { height: 10, borderRadius: 5 },
    count: { fontSize: 11, color: "#94A3B8" },
});
