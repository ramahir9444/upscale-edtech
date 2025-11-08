// src/services/authService.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { auth, db, googleProvider, ensureRecaptcha, ts } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const USERS = "users";

export async function upsertUserDoc(user, extra = {}) {
  const ref = doc(db, USERS, user.uid);
  const snap = await getDoc(ref);

  const base = {
    uid: user.uid,
    fullName: user.displayName || extra.fullName || "",
    email: user.email || extra.email || "",
    phone: user.phoneNumber || extra.phone || "",
    provider: user.providerData?.[0]?.providerId || extra.provider || "unknown",
    role: snap.exists() ? snap.data().role || "user" : "user",
    createdAt: snap.exists() ? snap.data().createdAt || ts() : ts(),
    updatedAt: ts(),
  };

  if (!snap.exists()) await setDoc(ref, base);
  else await updateDoc(ref, base);
}

/* ========== EMAIL FLOWS ========== */

export async function emailLogin({ email, password }) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  await upsertUserDoc(user, { provider: "password" });
  return user;
}

export async function emailSignup({ fullName, email, password }) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (fullName) await updateProfile(user, { displayName: fullName });
  await upsertUserDoc(user, { fullName, email, provider: "password" });
  return user;
}

/* ========== GOOGLE SIGN-IN ========== */

export async function googleSignIn() {
  const { user } = await signInWithPopup(auth, googleProvider);
  await upsertUserDoc(user, { provider: "google.com" });
  return user;
}

/* ========== PHONE FLOWS (LOGIN & SIGNUP) ========== */

export function isE164(phone) {
  return /^\+[1-9]\d{6,14}$/.test(phone);
}

export async function phoneSendOtp(phone, { containerId = "recaptcha-container" } = {}) {
  if (!isE164(phone)) throw new Error("Enter phone in E.164 format, e.g. +919876543210");
  const verifier = ensureRecaptcha(containerId);
  const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
  return confirmation;
}

/**
 * Wrap confirmation.confirm(code) with a timeout guard to avoid infinite loading.
 * Default timeout: 45s.
 */
export async function phoneConfirmOtp(confirmationResult, code, { fullName, email } = {}) {
  const withTimeout = (p, ms = 45000) =>
    Promise.race([
      p,
      new Promise((_, reject) => setTimeout(() => reject(new Error("OTP verification timed out. Try again.")), ms)),
    ]);

  const { user } = await withTimeout(confirmationResult.confirm(code));
  // Attach displayName (for phone signups) and store email in Firestore, since phone auth user has no email.
  if (fullName && !user.displayName) await updateProfile(user, { displayName: fullName });
  await upsertUserDoc(user, { fullName, email, phone: user.phoneNumber, provider: "phone" });
  return user;
}
