"use server";

import { signIn, signOut } from "@/auth";

export async function login(
  formData: { email: string; password: string },
  provider?: "credentials"
) {
  try {
    await signIn(provider, formData);
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
