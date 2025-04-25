import AlertBar from '@/Pages/Shop/AlertBar';
import Footer from '@/Pages/Shop/Footer';
import Navigation from '@/Pages/Shop/Navigation';

export default function ShopLayout({ children, alerts, columns }) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-white">
            <AlertBar alerts={alerts} />
            <Navigation columns={columns} />
            <main className="w-full flex-grow">{children}</main>
            <Footer columns={columns} />
        </div>
    );
}
