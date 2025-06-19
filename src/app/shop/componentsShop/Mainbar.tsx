'use client'

import React, { useState, ChangeEvent } from 'react';
import Results from './Results';

export default function Mainbar() {

    const [selectedFilter, setSelectedFilter] = useState<string>('price_desc');

    const handleFilterChange = (key: string) => {
        setSelectedFilter(key);
        console.log(`Selected filter: ${key}`);
    };
    // This component is used to display the main content area of the shop page
    // It includes the results section and handles filter changes

    return (

        <div className="flex flex-col flex-1">
                    <div className="h-14 mb-2">
                        {/*count needs to be dynamic within this component*/}
                        <Results count={100000000} onFilterChange={handleFilterChange}/>
                    </div>
                    <div className="flex-1 backdrop-blur-xs bg-amber-700/10 rounded-3xl mx-2">
                            {/* product cards*/}
                    </div>
                </div>
    );
}

