import LoginComponent from '@/app/login/LoginComponent';
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, deleteUser, User} from "firebase/auth";
import {ref, set, remove } from "firebase/database";

export default function LoginPage() {

    return (
        <main>
            <LoginComponent />
        </main>
    );
}

export const signUp = async (email: string, password: string, name: string): Promise<void> => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      updateProfile(user, {displayName: name});

      set(ref(db, 'users/' + user.uid), {
        username: name,
        id: user.uid,

      });
      
      alert('Signup successful!');
    })
    .catch((error: any) => {
      console.error("Error signing up: ", error);
      alert(`Signup failed: ${error.message}`);
    })
    
    .finally(() => {
      signIn(email, password);
    });
}

export const signIn = async (email: string, password: string): Promise<void> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) { 
        console.error("Error signing in:", error);
        alert(`Sign in failed: ${error.message}`);
    }
}


export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error signing out:", error);
  }
};

export const deleteUserAcc = async (user: User | null): Promise<void> => {
  if (!user) { throw new Error("User is not authenticated.");}

  try {
      const userRef = ref(db, 'users/' + user.uid);
      await remove(userRef);
      await deleteUser(user);
      console.log("User account and data deleted successfully.");

  } catch (error: any) {
      console.error("Error deleting user account:", error);
      throw error;
  }
};