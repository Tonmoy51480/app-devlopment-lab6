// app/(tabs)/statistics.tsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatBar from "../../components/stat-bar";
import { useStudents } from "../../context/students-context";

const BAR_COLOURS = ["#0D9488", "#185FA5", "#7C3AED", "#F59E0B", "#EF4444", "#059669"];

export default function Statistics() {
    const { students } = useStudents();

    // Derived value 1: department breakdown
    // Only recomputes when students changes.
    const deptStats = useMemo(() => {
        const counts: Record<string, number> = {};
        students.forEach((s) => {
            counts[s.department] = (counts[s.department] ?? 0) + 1;
        });
        return Object.entries(counts)
            .map(([dept, count]) => ({ dept, count }))
            .sort((a, b) => b.count - a.count);
    }, [students]);

    // Derived value 2: top skills ranking
    const topSkills = useMemo(() => {
        const counts: Record<string, number> = {};
        students.forEach((s) => {
            s.skills.forEach((skill) => {
                counts[skill] = (counts[skill] ?? 0) + 1;
            });
        });
        return Object.entries(counts)
            .map(([skill, count]) => ({ skill, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [students]);

    // Graded Feature 1: Average Skills Per Student
    const avgSkills = useMemo(() => {
        if (!students.length) return "0.0";
        const total = students.reduce((sum, s) => sum + (s.skills ? s.skills.length : 0), 0);
        return (total / students.length).toFixed(1);
    }, [students]);

    // Graded Feature 3: useRef for Previous Count & Badge
    const prevCount = useRef(students.length);
    const [badgeText, setBadgeText] = useState<string | null>(null);

    useEffect(() => {
        const diff = students.length - prevCount.current;
        if (diff !== 0) {
            if (diff > 0) {
                setBadgeText(`↑ ${diff} added`);
            } else {
                setBadgeText(`↓ ${Math.abs(diff)} removed`);
            }
            prevCount.current = students.length;

            const timer = setTimeout(() => {
                setBadgeText(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [students.length]);

    const isAdded = badgeText?.includes("added");

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryNumber}>{students.length}</Text>
                    <Text style={styles.summaryLabel}>Total Students</Text>
                    {badgeText && (
                        <View style={[styles.badgeContainer, { backgroundColor: isAdded ? "#10B981" : "#EF4444" }]}>
                            <Text style={styles.badgeText}>{badgeText}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.avgSkillsCard}>
                    <Text style={styles.avgSkillsNumber}>{avgSkills}</Text>
                    <Text style={styles.avgSkillsLabel}>Average Skills / Student</Text>
                </View>

                <Text style={styles.sectionTitle}>By Department</Text>
                <View style={styles.card}>
                    {deptStats.map(({ dept, count }, i) => (
                        <StatBar
                            key={dept}
                            label={dept}
                            count={count}
                            total={students.length}
                            colour={BAR_COLOURS[i % BAR_COLOURS.length]}
                        />
                    ))}
                    {deptStats.length === 0 && (
                        <Text style={styles.emptyText}>No department data available</Text>
                    )}
                </View>

                <Text style={styles.sectionTitle}>Top Skills</Text>
                <View style={styles.card}>
                    {topSkills.map(({ skill, count }, i) => (
                        <View key={skill} style={styles.skillRow}>
                            <Text style={styles.rank}>#{i + 1}</Text>
                            <Text style={styles.skillName}>{skill}</Text>
                            <Text style={styles.skillCount}>
                                {count} student{count !== 1 ? "s" : ""}
                            </Text>
                        </View>
                    ))}
                    {topSkills.length === 0 && (
                        <Text style={styles.emptyText}>No skills data available</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F0F4F8" },
    content: { padding: 16, paddingBottom: 40 },
    summaryCard: {
        backgroundColor: "#0D1F4E",
        borderRadius: 14,
        padding: 24,
        alignItems: "center",
        marginBottom: 16,
    },
    summaryNumber: { fontSize: 48, fontWeight: "800", color: "#FFFFFF" },
    summaryLabel: { fontSize: 14, color: "#CCFBF1", marginTop: 4 },
    badgeContainer: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 8,
    },
    badgeText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "700",
    },
    avgSkillsCard: {
        backgroundColor: "#0D9488",
        borderRadius: 14,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
    },
    avgSkillsNumber: { fontSize: 36, fontWeight: "800", color: "#FFFFFF" },
    avgSkillsLabel: { fontSize: 13, color: "#E6F4F1", marginTop: 4, fontWeight: "600" },
    sectionTitle: {
        fontSize: 11,
        fontWeight: "700",
        color: "#94A3B8",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 10,
        marginTop: 4,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    skillRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    rank: { fontSize: 14, fontWeight: "700", color: "#0D9488", width: 32 },
    skillName: { flex: 1, fontSize: 14, color: "#334155" },
    skillCount: { fontSize: 12, color: "#94A3B8" },
    emptyText: { fontSize: 14, color: "#94A3B8", textAlign: "center", paddingVertical: 10 },
});
