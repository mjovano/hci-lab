'use client'

import React, { useState, ChangeEvent, useEffect } from 'react';
import Results from './Results';
import { db } from '@/firebaseConfig';
import { ref, get } from 'firebase/database';
import { parse } from 'path';

{/*
interface Item {
    name?: string;
    price?: string;
    desc?: string;
    vendor?: string;
    date?: string;
    images?: { key: string; value: string }[];
    featured?: boolean;
}

interface Items {
    [key: string]: Item;
}
*/}

export default function Mainbar() {
    const [items, setItems] = useState<Record<string, any> | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<string>('price_desc');

     useEffect(() => {
        async function loadItems() {
            const fetchedItems = await fetchItems();
            const parsedItems = JSON.parse(JSON.stringify(fetchedItems));
            setItems(parsedItems);
        }
        loadItems();
    }, []);

    const handleFilterChange = (key: string) => {
        setSelectedFilter(key);
        console.log(`Selected filter: ${key}`);
    };

    return (

        <div className="flex flex-col flex-1">
                    <div className="h-14 mb-2">
                        {/*count needs to be dynamic within this component*/}
                        <Results count={100000000} onFilterChange={handleFilterChange}/>
                    </div>
                    <div className="flex-1 backdrop-blur-xs bg-amber-700/10 rounded-3xl mx-2">
                            {/* product cards *
                            {items && (
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 2xl:grid-cols-5 md:gap-6 py-4 px-2 md:p-6 overflow-y-scroll">
                                    {Object.entries(items).map(([key, item]) => (
                                        <div
                                            key={key}
                                            className="relative bg-zinc-600/30 rounded-xl shadow-md flex flex-col w-40 md:w-48"
                                        >
                                            {item.images && (
                                                <img
                                                    src={item.images?.img1}
                                                    className="h-32 w-full object-scale-down p-2"
                                                />
                                            )}
                                            <div className="flex-1 flex flex-col p-4">
                                                <h2 className="text-lg font-semibold text-center mb-2">{item.name}</h2>
                                                <div className="flex items-end justify-between mt-auto">
                                                    <a
                                                        href={`/product/${encodeURIComponent(key)}`}
                                                        className="bg-indigo-300 text-white p-2 rounded-lg text-sm font-medium hover:bg-amber-800 transition"
                                                    >
                                                        Buy now
                                                    </a>
                                                    <span className="text-lg font-bold text-amber-300">
                                                        {item.price ? `${item.price}` : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                                */}


                    </div>
                </div>
    );
}


export async function fetchItems(): Promise<Record<string, any> | null> {
    const itemRef = ref(db, `items`);
    const snapshot = await get(itemRef);

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.val();
}