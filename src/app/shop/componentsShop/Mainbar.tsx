'use client'

import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import Results from './Results';
import { db } from '@/firebaseConfig';
import { ref, get, set } from 'firebase/database';
import { useSearchParams } from 'next/navigation';


type Item = {
    name: string;
    price: string;
    desc: string;
    vendor: string;
    date: string;
    images: Record<string, string>;
    featured: boolean;
    type: string;
    size: string;
    key?: string;
}
{/*
type Items {
    [key: string]: Item;
}
*/}

export default function Mainbar() {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>('price_desc');
    const params = useSearchParams();

     useEffect(() => {
        async function loadItems() {
            const fetchedItems = await fetchItems();
            // add original key to item
            setItems(fetchedItems? Object.entries(fetchedItems).map(([key, item]) => ({ ...item, key })): []);
        }
        loadItems();
    }, []);

    const handleFilterChange = (key: string) => {
        setSelectedFilter(key);
        console.log(`Selected filter: ${key}`);
    };

    const selectedTypes  = params.getAll('type')
    const selectedPrices = params.getAll('price')
    const selectedVendors = params.getAll('vendor')
    const selectedSizes = params.getAll('size')

    const filteredItems = useMemo(
    () => filterItemsSearch(items, { type: selectedTypes, price: selectedPrices, vendor: selectedVendors, size: selectedSizes }),
    [items, selectedTypes.join(','), selectedPrices.join(','), selectedVendors.join(','), selectedSizes.join(',')]
    )

    const displayedItems = useMemo(() => {
        let result = [...filteredItems];

        if (selectedFilter === 'featured') {
            result = result.filter(item => item.featured);
        } else if (selectedFilter === 'price_desc') {
            result.sort((a, b) => {
                const priceA = Number(a.price.replace(/[^\d.]/g, '')) || 0;
                const priceB = Number(b.price.replace(/[^\d.]/g, '')) || 0;
                return priceB - priceA;
            });
        } else if (selectedFilter === 'price_asc') {
            result.sort((a, b) => {
                const priceA = Number(a.price.replace(/[^\d.]/g, '')) || 0;
                const priceB = Number(b.price.replace(/[^\d.]/g, '')) || 0;
                return priceA - priceB;
            });
        } else if (selectedFilter === 'newest') {
            result.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
            });
        }

        return result;
    }, [filteredItems, selectedFilter]);


    return (

        <div className="flex flex-col flex-1">

                    <div className="h-14 mb-2">
                        <Results count={getDisplayedItemsCount(displayedItems)} onFilterChange={handleFilterChange}/>
                    </div>

                    <div className="flex-1 backdrop-blur-xs bg-amber-700/10 rounded-3xl mx-2 overflow-auto">
                            {/* product cards     */}
                            {displayedItems && (
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-6 py-4 px-2 md:p-6">
                                    {Object.entries(displayedItems).map(([key, item]) => (
                                        <div
                                            key={key}
                                            className="relative bg-zinc-600/30 rounded-xl shadow-md flex flex-col md:w-full"
                                        >
                                            {item.images && (
                                                <>
                                                    <img
                                                        src={item.images.img1}
                                                        className="h-32 w-full object-scale-down p-2"
                                                    />
                                                </>
                                            )}
                                            
                                            <div className="flex-1 flex flex-col p-4">
                                                <h2 className="text-lg font-semibold font-secondary text-center mb-2 bg-gradient-to-r from-indigo-300/80 rounded-lg text-amber-900">{item.name}</h2>
                                                <div className="flex items-end justify-between mt-auto">
                                                    <a
                                                        href={`/product/${encodeURIComponent(item.key || '')}`}
                                                        className="bg-indigo-300 text-white p-2 rounded-lg text-sm font-secondary hover:bg-amber-800 transition"
                                                    >
                                                        Buy now
                                                    </a>
                                                    <span className="text-lg font-bold text-amber-300 mb-1">
                                                        {item.price ? `${item.price}` : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}


                    </div>
                </div>
    );
}

// Fetch items from Firebase Realtime Database

export async function fetchItems(): Promise<Record<string, any> | null> {
    const itemRef = ref(db, `items`);
    const snapshot = await get(itemRef);

    if (!snapshot.exists()) {
        return null;
    }
    return snapshot.val();
}


// Return the count of displayed items
export function getDisplayedItemsCount(items: Item[]): number {
    return items.length;
}


// Filter items based on search parameters

export function filterItemsSearch(
    items: Item[],
    searchParams: Record<string, string | string[] | null>
    ) {
    
    const types: string[]  = []
    const prices: string[] = []
    const vendors: string[] = []
    const sizes: string[] = []

    const _t = searchParams.type
    if (Array.isArray(_t)) types.push(..._t)
    else if (typeof _t === 'string') types.push(_t)

    const _p = searchParams.price
    if (Array.isArray(_p)) prices.push(..._p)
    else if (typeof _p === 'string') prices.push(_p)

    const _v = searchParams.vendor
    if (Array.isArray(_v)) vendors.push(..._v)
    else if (typeof _v === 'string') vendors.push(_v)

    const _s = searchParams.size
    if (Array.isArray(_s)) sizes.push(..._s)
    else if (typeof _s === 'string') sizes.push(_s)

    return (Array.isArray(items) ? items : []).filter(item => {
        // type must match if any types are selected
        const okType = types.length
        ? item.type !== undefined && types.includes(item.type)
        : true

        // price must fall into any of the selected ranges
        const okPrice = prices.length
        ? prices.some(range => {
            const [min, max] = range.split('-').map(Number)
            // parse
            const val = item.price ? Number(item.price.replace(/[^\d.]/g, '')) : NaN
            return !isNaN(val) && val >= min && val <= max
            })
        : true

        // vendor must match if any vendors are selected
        const okVendor = vendors.length
        ? item.vendor !== undefined && vendors.includes(item.vendor)
        : true

        // size must match if any sizes are selected
        const okSize = sizes.length
        ? item.size !== undefined && sizes.includes(item.size)
        : true


        return okType && okPrice && okVendor && okSize
  })
}