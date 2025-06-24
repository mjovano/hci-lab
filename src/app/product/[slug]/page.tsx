import NavbarShop from "../../shop/componentsShop/NavbarShop";
import CarouselProduct from "./componentsProduct/CarouselProduct";
import ProductDetails from "./componentsProduct/ProductDetails";
import { Suspense } from "react";

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;  // slug is last part of url (itemID)

    return (
        
        <main className="flex flex-col min-h-screen md:px-28">
            <div className="md:-mx-28 mb-4">
                <NavbarShop/>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 w-full h-dvh md:pb-30 pb-4">
                <div className="flex-1 bg-gray-100/40 p-4 rounded">
                
                <CarouselProduct
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
