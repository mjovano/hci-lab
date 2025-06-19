import NavbarShop from "../../components/NavbarShop";

export default function Product() {

    return (
        <main className="flex flex-col max-h-full md:px-28">
            <div className="md:-mx-28 mb-4">
                <NavbarShop/>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 w-full h-full min-h-screen md:pb-30 pb-4">
                <div className="flex-1 bg-gray-100/20 p-4 rounded">
                
                First Div
                
                </div>
                
                <div className="flex-1 bg-gray-200/20 p-4 rounded">
                
                Second Div
                
                </div>
            </div>
        </main>
    );
}