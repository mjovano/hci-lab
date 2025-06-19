'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Search from '@/components/SearchBar';


type FilterOption = {
    label: string;
    value: string;
};

type DropdownProps = {
    title: string;
    options: FilterOption[];
    selected: string[];
    onChange: (value: string, checked: boolean) => void;
};


const Dropdown = ({ title, options, selected, onChange }: DropdownProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="mb-2">

            <button
                className="w-full flex justify-between items-center px-4 py-1 mt-3"
                onClick={() => setOpen((prev) => !prev)}
                type="button"
            >
                <span className="text-md font-semibold">{title}</span>
                <span className='text-xs'>{open ? '▲' : '▼'}</span>
            </button>

            <hr className="border-t border-zinc-700 mx-2" />

            {open && (
                <div className="my-2 px-2">

                    {options.map((opt) => (
                        <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selected.includes(opt.value)}
                                onChange={(e) => onChange(opt.value, e.target.checked)}
                                className="accent-amber-100"
                            />
                            <span className="text-sm">{opt.label}</span>
                        </label>
                    ))}
                    
                </div>
            )}

        </div>
    );
};


const typeOptions: FilterOption[] = [
    { label: 'Tent', value: 'tent' },
    { label: 'Gear', value: 'gear' },
    { label: 'Misc', value: 'misc' },
];

const priceOptions: FilterOption[] = [
    { label: '$0-$10', value: '0-10' },
    { label: '$10-$100', value: '10-100' },
    { label: '$100+', value: '100+' },
];

const vendorOptions: FilterOption[] = [
    { label: 'Vendor1', value: 'vendor1' },
    { label: 'Vendor2', value: 'vendor2' },
    { label: 'Vendor3', value: 'vendor3' },
];

const sizeOptions: FilterOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
];


function getSelectedFromParams(params: URLSearchParams, key: string): string[] {
    return params.getAll(key);
}


export default function Sidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // helper
    const getSelected = (key: string) => getSelectedFromParams(searchParams, key);

    const handleChange = (key: string) => (value: string, checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.getAll(key);

        if (checked) {
            params.append(key, value);
        } else {
            // Remove all and re-add except the unchecked value
            params.delete(key);
            current.filter((v) => v !== value).forEach((v) => params.append(key, v));
        }

        router.replace(`?${params.toString()}`);
    };

    return (
        <div className="w-full h-full flex flex-col p-4">
            
            <div className="mb-4">
                <Search showButton={0}/>
            </div>

            <Dropdown
                title="Type"
                options={typeOptions}
                selected={getSelected('type')}
                onChange={handleChange('type')}
            />
            <Dropdown
                title="Price"
                options={priceOptions}
                selected={getSelected('price')}
                onChange={handleChange('price')}
            />
            <Dropdown
                title="Vendor"
                options={vendorOptions}
                selected={getSelected('vendor')}
                onChange={handleChange('vendor')}
            />
            <Dropdown
                title="Size"
                options={sizeOptions}
                selected={getSelected('size')}
                onChange={handleChange('size')}
            />
        </div>
    );
}