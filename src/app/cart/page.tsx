import CartComponent from './CartComponent';
import Navbar from '../shop/componentsShop/NavbarShop';
export default function LoginPage() {

    return (
        <main className='flex flex-col min-h-screen md:px-28'>
            
            <div className="md:-mx-28 mb-4">
                <Navbar/>
            </div>

            <div className="flex bg-gray-300/50 md:px-10 p-5 mx-1 rounded-lg backdrop-blur-sm h-150 md:h-175" >
                <CartComponent />
            </div>
        </main>
    );
}