import NavbarShop from "../../shop/componentsShop/NavbarShop";
import CarouselProduct from "./componentsProduct/CarouselProduct";
import { ref, get } from "firebase/database";
import { db } from "@/firebaseConfig";
import ProductDetails from "./componentsProduct/ProductDetails";

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;  // slug is last part of url (itemID)
    const images = await fetchItemImages(params.slug);

    return (
        
        <main className="flex flex-col min-h-screen md:px-28">
            <div className="md:-mx-28 mb-4">
                <NavbarShop/>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 w-full h-dvh md:pb-30 pb-4">
                <div className="flex-1 bg-gray-100/40 p-4 rounded">
                
                <CarouselProduct
                    images={images}
                    slug={params.slug}
                />

                </div>
                
                <div className="hidden md:flex flex-1 bg-gray-100/40 p-4 rounded">
                
                <ProductDetails id={params.slug} />
                
                </div>

            </div>
        </main>
    );
}

// Fetches all image URLs for a given item ID from the 'images' subcollection
export async function fetchItemImages(itemId: string): Promise<string[]> {
    const imagesRef = ref(db, `items/${itemId}/images`);
    const snapshot = await get(imagesRef);

    if (!snapshot.exists()) {
        return [];
    }

    const imagesObj = snapshot.val();
    return Object.values(imagesObj);
}
