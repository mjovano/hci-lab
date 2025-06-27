"use client";

import React, { useEffect, useState } from "react";
import { db, auth } from "@/firebaseConfig";
import { ref, get, set } from "firebase/database";
import { onAuthStateChanged, User } from 'firebase/auth';

interface Item {
    name?: string;
    price?: string;
    desc?: string;
    vendor?: string;
    date?: string;
    images?: Record<string, string>;
    featured?: boolean;
    type?: string;
    size?: string;
}

export default function ProductDetails({ id }: { id: string }) {
    const [user, setUser] = useState<User | null>(null);
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchItem(id).then(fetchedItem => {
            setItem(fetchedItem);
            setLoading(false);
        });
    }, [id]);

    const uid = user ? user.uid : null;

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (!item) {
        return <div className="text-center py-8 text-red-500">Item not found.</div>;
    }

    return (
        <div className="flex flex-col gap-4 p-4 md:p-10 bg-gray-300/50 rounded-lg max-h-screen">
            <div className="hidden md:flex justify-center font-semibold text-4xl mb-6 tracking-widest font-primary overline text-indigo-950"> {item.name} </div>

            <hr className="hidden md:flex bg-gradient-to-r from-indigo-800 border-transparent p-1 backdrop-blur-xs rounded-b-lg mb-4 ml-6" />

            <div className="flex text-center m-2 md:m-6 p-2 md:p-4 backdrop-blur-lg bg-amber-500/20 rounded-xl text-xs md:text-lg">  {item.desc} </div>

            <div className="flex items-center justify-around my-6">
                <button
                    className="bg-zinc-600 hover:bg-zinc-900 text-amber-100 font-bold py-3 px-8 rounded-lg md:text-lg font-primary"
                    onClick={() => {
                        if (uid) {
                            addToCart(id, uid)
                                .then(() => alert("Item added to cart!"))
                                .catch(error => console.error("Error adding item to cart:", error));
                        } else {
                            alert("Please log in to add items to your cart.");
                        }
                    }}
                >
                    Add to Cart
                </button>
                <span className="md:text-2xl font-semibold text-gray-800 tracking-wide p-2 backdrop-blur-md rounded-lg">
                    Price: {item.price ? `  ${item.price}` : "Price not available"}
                </span>
            </div>

            
            <div className="flex justify-between m-4 text-gray-700 backdrop-blur-md p-2 text-xs md:text-lg rounded-b-md">
                <span>Vendor: {item.vendor || "Unknown"}</span>
                <span>Date added: {item.date || "Not specified"}</span>
            
            </div>


        </div>
    );
};

export async function addToCart(itemId: string, userId: string): Promise<void> {
    const cartRef = ref(db, `users/${userId}/cart`);

    await get(cartRef).then(snapshot => {
        const cart = snapshot.val() || {};
        cart[itemId] = (cart[itemId] || 0) + 1; // increment item quantity
        return set(cartRef, cart);
    }
    );
}


export async function fetchItem(itemId: string): Promise<Item | null> {
    const itemRef = ref(db, `items/${itemId}`);
    const snapshot = await get(itemRef);

    if (!snapshot.exists()) {
        return null;
    }
    return snapshot.val();
}