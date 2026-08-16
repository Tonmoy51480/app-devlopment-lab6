import AddStudentForm from "@/components/add-student-form";
import SearchBar from "@/components/search-bar";
import StudentDetail from "@/components/student-detail";
import StudentItem from "@/components/student-item";
import { Student, STUDENTS } from "@/data/students";
import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, Pressable, TextInput } from "react-native";

import { router } from "expo-router";
import { useStudents } from "../../context/students-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDebounce } from "../../hooks/use-debounce";

export default function HomePage() {
    const [query, setQuery] = useState<string>("");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const searchRef = useRef<TextInput>(null);

    // Focus the search bar 300ms after mount (lets animation finish)
    useEffect(() => {
        const timer = setTimeout(() => {
            searchRef.current?.focus();
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Replaced by router navigation
    // const [showForm, setShowForm] = useState(false);

    // Replaced by context
    // const [students, setStudents] = useState<Student[]>(STUDENTS);
    // Read students directly from the global context
    const { students } = useStudents();

    const debouncedQuery = useDebounce(query, 300);

    // No longer needed
    // const handleNewStudent = (newStudent: Student) => {
    //     // Lifting state up in action: the form hands the new
    //     // student back to this parent screen, which prepends
    //     // it to the list.
    //     setStudents((prev) => [newStudent, ...prev]);
    //     setShowForm(false);
    // };

    const filtered = useMemo(() => {
        return students.filter((s) => {
            return s.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || s.department.toLowerCase().includes(debouncedQuery.toLowerCase());
        });
    }, [students, debouncedQuery]);

    const handleSelect = useCallback((student: Student) => {
        setSelectedStudent((prev) => (prev?.id === student.id ? null : student));
    }, []);

    // Replaced by new route
    // if (showForm) {
    //     return <AddStudentForm onSubmitSuccess={handleNewStudent} onClose={() => setShowForm(false)} />;
    // }

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Student Directory</Text>
                {/* Navigate to the AddStudent screen — no prop passing needed */}
                <Pressable style={styles.addButton} onPress={() => router.push("/(tabs)/add-student")}>
                    <Text style={styles.addButtonText}>+ Add</Text>
                </Pressable>
            </View>

            <SearchBar ref={searchRef} value={query} onChangeText={setQuery} debounceDelay={300} />

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <StudentItem student={item} onPress={handleSelect} isSelected={selectedStudent?.id === item.id} />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No students match "{query}"</Text>
                    </View>
                }
            />

            {selectedStudent && <StudentDetail student={selectedStudent} onRemoved={() => setSelectedStudent(null)} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F0F4F8" },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#0D1F4E",
    },
    title: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
    addButton: {
        backgroundColor: "#0D9488",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
    empty: { padding: 40, alignItems: "center" },
    emptyText: { fontSize: 14, color: "#94A3B8" },
});
