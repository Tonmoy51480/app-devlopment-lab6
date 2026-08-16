// app/(tabs)/add-student.tsx

import React from "react";
import {  StyleSheet } from "react-native";
import AddStudentForm from "../../components/add-student-form";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddStudentScreen() {
    return (
        <SafeAreaView style={styles.screen}>
            <AddStudentForm />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#FFFFFF" },
});
