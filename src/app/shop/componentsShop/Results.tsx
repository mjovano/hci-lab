'use client';

import React, { useState, ChangeEvent } from 'react';

type FilterOption = {
    label: string;
    tag: string;
};

const filterOptions: FilterOption[] = [
    { label: 'Price: Highest to Lowest', tag: 'price_desc' },
    { label: 'Price: Lowest to Highest', tag: 'price_asc' },
    { label: 'Newest', tag: 'newest' },
    { label: 'Featured', tag: 'featured' }
];

interface ResultsProps {
    count: number;
    onFilterChange?: (key: string) => void;
}

export default function Results({ count, onFilterChange }: ResultsProps) {
    const [selectedKey, setSelectedKey] = useState<string>(filterOptions[0].tag);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedKey(e.target.value);
        if (onFilterChange) {
            onFilterChange(e.target.value);
        }
    };

    return (
        <div className="flex items-center justify-between w-full py-3">

            <div className="hidden md:flex flex-col ml-12 pt-3">

                <span className="text-gray-800 text-md font-secondary tracking-wide">{count} &nbsp; &nbsp; results</span>
                <hr className="w-full border-gray-800 mt-1" />

            </div>

            <button
                className="md:hidden bg-zinc-700 text-amber-100 text-md px-8 py-1 rounded-2xl mx-6 font-secondary"
                type="button"
            >
                Filter
            </button>

            <div className="flex items-center">
                <select
                    id="filter"
                    value={selectedKey}
                    onChange={handleChange}
                    className="bg-zinc-900/60 rounded p-2 text-sm md:text-md focus:outline-none font-medium focus:ring-1 text-amber-100 mr-6 backdrop-blur-sm"
                >
                    {filterOptions.map(option => (
                        <option key={option.tag} value={option.tag}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            
        </div>
    );
}