// context/students-context.tsx

import React from "react";
import { createContext, useContext, useReducer } from "react";
import { STUDENTS } from "../data/students";
import { StudentsAction, StudentsState, studentsReducer } from "./students-reducer";

// ── Context shape ────────────────────────────────────────
// Any component that consumes this context receives both
// the current list AND the dispatch function to update it.
interface StudentsContextValue {
    students: StudentsState;
    dispatch: React.Dispatch<StudentsAction>;
}

// createContext requires a default value.
// We use null and guard against it in the custom hook below.
const StudentsContext = createContext<StudentsContextValue | null>(null);

// ── Provider component ───────────────────────────────────
// Wraps the app and supplies state to all children.
interface StudentsProviderProps {
    children: React.ReactNode;
}

export function StudentsProvider({ children }: StudentsProviderProps) {
    // useReducer wires the reducer function to the initial state.
    // dispatch is a stable function — safe to pass without useCallback.
    const [students, dispatch] = useReducer(studentsReducer, STUDENTS);

    return <StudentsContext.Provider value={{ students, dispatch }}>{children}</StudentsContext.Provider>;
}

// ── Custom hook ──────────────────────────────────────────
// Wraps useContext with a guard: throws a helpful error if
// a component tries to use this hook outside the Provider.
export function useStudents(): StudentsContextValue {
    const ctx = useContext(StudentsContext);
    if (!ctx) {
        throw new Error("useStudents must be used inside a StudentsProvider");
    }
    return ctx;
}
