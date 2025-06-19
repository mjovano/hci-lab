import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export default function DropdownMenu() {
  return (
    <Menu as="div" className="flex justify-end">
      <div>
        <MenuButton className="inline-flex w-3xs justify-end gap-x-2 rounded-3xl ml-4 shadow-md bg-zinc-700 p-2 text-sm font-semibold text-gray-300 hover:bg-zinc-900">
          Products
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="mx-3 size-5">
            <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
            </svg>

        </MenuButton>
      </div>

      <MenuItems
        anchor="bottom"
        transition
        className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-zinc-200 shadow-lg ring-1
         ring-black/5 focus:outline-none z-20"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="/shop?q=tents"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Tents
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="/shop?q=gear"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Gear
            </a>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <a
              href="/shop?q=other"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Other
            </a>
          </MenuItem>
          
        </div>
        
        <div className="py-1">
          <MenuItem>
            <a
              href="/shop?q="
              className="hidden px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Hidden
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
