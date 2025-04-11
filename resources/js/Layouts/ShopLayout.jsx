import AlertBar from '@/Pages/Shop/AlertBar';
import Footer from '@/Pages/Shop/Footer';
import Navigation from '@/Pages/Shop/Navigation';

export default function ShopLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-white">
            <AlertBar />
            <Navigation />
            <main className="w-full flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
