'use client';
import { useState, useEffect } from 'react';
import { useRouter} from 'next/navigation';
import Link from 'next/link';

import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, deleteUser, User, getAuth, onAuthStateChanged,} from "firebase/auth";
import {ref, set, remove } from "firebase/database";

export default function LoginComponent() {
    const [tab, setTab] = useState<'signin' | 'signup'>('signin');
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await signIn(email, password);
        } catch (err: any) {
            setError(err.message);
        }

        router.refresh();
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await signUp(email, password, name);
        } catch (err: any) {
            setError(err.message);
        }

        router.refresh();
    };

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (err: any) {
            setError(err.message);
        }

        router.refresh();
    };

    const handleDelete = async () => {
        try {
            await deleteUserAcc(user);
        } catch (err: any) {
            setError(err.message);
        }

        router.refresh();
    };

    return (

        <div className="flex flex-col items-center justify-center min-h-screen gap-y-14">
            <div className="max-w-sm p-6 bg-gray-100/50 rounded shadow backdrop-blur-xs mx-2">
                <div className="mb-4 text-xl font-semibold text-center text-indigo-900">
                    Welcome, {user?.displayName || 'guest'}!
                </div>
                {!user && (
                    <div className="flex mb-6">
                        <button
                            className={`flex-1 py-2 rounded-l ${tab === 'signin' ? 'bg-zinc-700 text-amber-100' : 'bg-gray-300'}`}
                            onClick={() => setTab('signin')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`flex-1 py-2 rounded-r ${tab === 'signup' ? 'bg-zinc-700 text-amber-100' : 'bg-gray-300'}`}
                            onClick={() => setTab('signup')}
                        >
                            Sign Up
                        </button>
                    </div>
                )}
                {error && <div className="mb-4 text-red-800 text-sm">{error}</div>}
                {!user ? (
                    <form onSubmit={tab === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded bg-amber-100/50"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="username"
                            className={`w-full px-3 py-2 border rounded bg-amber-100/50 ${tab === 'signin' ? ' hidden' : ''}`}
                            placeholder="Username"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required={tab === 'signup'}

                                
                        />
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded bg-amber-100/50"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        
                        <button
                            type="submit"
                            className="w-full py-2 bg-zinc-600 text-amber-100 rounded hover:bg-zinc-700"
                        >
                            {tab === 'signin' ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <button
                            onClick={handleLogOut}
                            className="w-full py-2 bg-zinc-600 text-amber-100 rounded hover:bg-zinc-800"
                        >
                            Log Out
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full py-2 bg-amber-900 text-white rounded hover:bg-amber-950"
                        >
                            Delete Account
                        </button>
                    </div>
                )}

                <div className="mt-4 text-center text-sm text-gray-500">
                    {user ? `Logged in as ${user.email}, ID is ${user.uid}` : 'Please sign in or sign up.'}
                </div>
            </div>

            {user && (
                <div className="max-w-md p-10 bg-gray-100/50 rounded-xl shadow backdrop-blur-xs flex flex-col gap-4 items-center">
                    
                    <Link
                        prefetch={true}
                        href="/"
                        className="w-full p-2 px-6 bg-zinc-600 text-amber-100 rounded hover:bg-zinc-700 text-center text-semibold text-lg"
                    >
                        Go to Home Page
                    </Link>
                    <Link
                        href="/shop"
                        className="w-full p-2 px-6 bg-zinc-600 text-amber-100 rounded hover:bg-zinc-700 text-center text-semibold text-lg"
                    >
                        Go to Shop Page
                    </Link>
                    <Link
                        href="/Blog"
                        className="w-full p-2 px-6 bg-zinc-600 text-amber-100 rounded hover:bg-zinc-700 text-center text-semibold text-lg"
                    >
                        Go to Blog Page
                    </Link>
                </div>
            )}

        </div>
        
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