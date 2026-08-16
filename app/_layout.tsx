// app/_layout.tsx
 
import React from "react";
import { Stack } from "expo-router";
import { StudentsProvider } from "../context/students-context";
 
export default function RootLayout() {
  return (
    // StudentsProvider wraps everything — every screen in the
    // entire app can now call useStudents() and get the list.
    <StudentsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </StudentsProvider>
  );
}
