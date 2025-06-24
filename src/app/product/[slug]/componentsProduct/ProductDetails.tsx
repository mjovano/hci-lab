"use client";

import React, { useEffect, useState } from "react";
import { db, auth } from "@/firebaseConfig";
import { ref, get } from "firebase/database";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface Item {
    name?: string;
    price?: string;
    desc?: string;
    vendor?: string;
    date?: string;
    images?: { key: string; value: string }[];
    featured?: boolean;
}

export default async function ProductDetails( { id }: { id: string }) {
    //const [item, setItem] = useState<Item | null>(null);
    //const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
    }, []);

    const item = await fetchItem(id);
    

    if (!item) {
        return <div className="text-center py-8 text-red-500">Item not found.</div>;
    }

    return (
        <div className="flex flex-col gap-4 p-6 bg-white rounded shadow">
            <div>
                <span className="font-semibold">Name:</span> {item.name || "N/A"}
            </div>
            <div>
                <span className="font-semibold">Price:</span> {item.price || "N/A"}
            </div>
            <div>
                <span className="font-semibold">Description:</span> {item.desc || "N/A"}
            </div>
            {/* Add more fields as needed */}
        </div>
    );
};

export async function fetchItem(itemId: string): Promise<Item | null> {
    const itemRef = ref(db, `items/${itemId}`);
    const snapshot = await get(itemRef);

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.val();
}