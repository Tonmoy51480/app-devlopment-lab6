import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookmarksScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Bookmarks</Text>
                <Text style={styles.subtitle}>Saved students will appear here.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F0F4F8" },
    content: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", color: "#0D1F4E", marginBottom: 8 },
    subtitle: { fontSize: 16, color: "#94A3B8" },
});
