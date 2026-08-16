import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#0D9488",
                tabBarInactiveTintColor: "#94A3B8",
                headerShown: false,
                tabBarButton: HapticTab,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size || 28} color={color} />,
                }}
            />

            <Tabs.Screen
                name="statistics"
                options={{
                    title: "Stats",
                    tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart-outline" size={size || 28} color={color} />,
                }}
            />

            <Tabs.Screen
                name="bookmarks"
                options={{
                    title: "Bookmarks",
                    tabBarIcon: ({ color, size }) => <Ionicons name="bookmark-outline" size={size || 28} color={color} />,
                }}
            />

            <Tabs.Screen
                name="add-student"
                options={{
                    title: "Add Student",
                    href: null, // routable but hidden from the tab bar
                    headerShown: true,
                    headerTitle: "Join the Directory",
                    headerStyle: { backgroundColor: "#0D1F4E" },
                    headerTintColor: "#FFFFFF",
                }}
            />

            <Tabs.Screen
                name="explore"
                options={{
                    href: null, // hidden from the tab bar
                }}
            />
        </Tabs>
    );
}
