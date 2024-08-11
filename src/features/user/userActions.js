import { createAction } from "@reduxjs/toolkit";

// Exemple d'une action simple
export const resetUserError = createAction("user/resetUserError");

// Action spécifique qui ne nécessite pas de reducer ou qui n'est pas directement liée à un thunk
export const setUserLoading = createAction("user/setUserLoading");
