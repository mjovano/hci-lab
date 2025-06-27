'use client'
import { auth, db } from "../../firebaseConfig";
import { get, ref, remove } from "firebase/database";
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from "react";

type CartItem = {
    name: string;
    price: string;
    quantity: number;
    image: string;
    id: string;
};

export default function CartComponent() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchCartItems(user.uid);
            } else {
                setUser(null);
                setCartItems([]);
            }
        });
    }, []);

    const fetchCartItems = async (uid: string) => {
        const cartRef = ref(db, `users/${uid}/cart`); // the key is the id of the item, the value is the quantity
        const snapshot = await get(cartRef);
        if (!snapshot.exists()) {
            console.log('No items in cart');
            setCartItems([]);
            return;
        }

        const cartData = snapshot.val();
        const itemIds = Object.keys(cartData);

        // fetch item details for each itemID
        const itemPromises = itemIds.map(async (id) => {
            const itemRef = ref(db, `items/${id}`);
            const itemSnap = await get(itemRef);

            if (itemSnap.exists()) {
            const itemData = itemSnap.val();
            const img = Object.values(itemData.images)[0]; 

            return {
                name: itemData.name,
                price: itemData.price,
                quantity: cartData[id],
                image: img,
                id: id,
            } as CartItem;
            }
            return null;
        });

        const items = (await Promise.all(itemPromises)).filter(Boolean) as CartItem[];
        setCartItems(items);
        
    };

    const removeFromCart = async (itemId: string) => {
        if (!user) return;
        const itemRef = ref(db, `users/${user.uid}/cart/${itemId}`);
        await remove(itemRef);
        fetchCartItems(user.uid);
    };

    const calculateTotalPrice = (): string => {
        const total = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
            return sum + (price * item.quantity);
        }, 0);

        return total.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        
    }
    
    return (
        <div className="flex flex-col w-full">
            <span className="text-2xl font-bold text-center mb-4 font-secondary tracking-wide">Current items in cart</span>
            <div className="bg-gradient-to-r from-amber-700/30 rounded shadow-sm p-4 flex flex-col items-center overflow-auto">
            
                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>

                ) : (
                    <ul className="w-full space-y-4">

                        {cartItems.map(item => (
                            <li key={item.id} className="flex items-center space-x-4 p-1 border-b border-indigo-500/50">
                                <img src={item.image} alt={item.name} className="size-18 object-scale-down rounded" />

                                <div className="flex-1">
                                    <div className="font-semibold md:text-lg text-indigo-900 font-primary text-center md:text-left">{item.name}</div>
                                    <div className="hidden md:block text-amber-100 text-sm font-secondary">Quantity: {item.quantity}</div>
                                    <div className="text-amber-400 font-bold text-center md:text-left">{item.price}</div>
                                </div>

                                <span
                                    className="text-indigo-800/80 cursor-pointer hover:underline w-12 md:w-fit text-[10px] md:text-sm text-right"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove from cart
                                </span>
                            </li>
                        ))}

                    </ul>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="flex items-center justify-between mt-6 w-full px-10">
                    <span className="text-lg font-semibold text-gray-900">
                    Total price: {calculateTotalPrice()}
                    </span>
                    <button
                    className="bg-zinc-600 text-amber-100 px-6 py-2 rounded hover:bg-zinc-800"
                    onClick={() => {
                        cartItems.forEach(item => removeFromCart(item.id));
                    }}
                    >
                    Purchase
                    </button>
                </div>
            )}
            
        </div>
    );
}