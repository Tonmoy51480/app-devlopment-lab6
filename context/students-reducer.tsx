// context/students-reducer.ts

import { Student } from "../data/students";
import { STUDENTS } from "../data/students";

// ── State shape ─────────────────────────────────────────
// The reducer manages an array of students.
// This type alias makes it clear what the state is.
export type StudentsState = Student[];

// ── Action union type ────────────────────────────────────
// Every possible mutation is a named action object.
// TypeScript's union type ensures only valid actions can be dispatched.
export type StudentsAction =
    | { type: "ADD_STUDENT"; payload: Student }
    | { type: "REMOVE_STUDENT"; payload: string } // payload = student id
    | { type: "RESET" };

// ── Reducer function ─────────────────────────────────────
// Takes current state + an action, returns the next state.
// Never mutates state directly — always returns a new array.
export function studentsReducer(state: StudentsState, action: StudentsAction): StudentsState {
    switch (action.type) {
        case "ADD_STUDENT":
            // Prepend the new student so it appears at the top of the list
            return [action.payload, ...state];

        case "REMOVE_STUDENT":
            // Return all students except the one with the matching id
            return state.filter((s) => s.id !== action.payload);

        case "RESET":
            // Replace the entire list with the original static data
            return STUDENTS;

        default:
            // Unknown action — return state unchanged
            return state;
    }
}
