import PurchaseProcessContext from './PurchaseProcess/PurchaseProcessContext';

export default function Home() {
    return (
        <>
            <header className="container mx-auto mb-5">
                <h1 className="bg-white p-3 m-0">Online Shop</h1>
            </header>
            <main className="container mx-auto flex flex-col gap-5 min-h-full">
                <PurchaseProcessContext />
            </main>
            <footer className="container mx-auto my-5 bg-white p-3 flex justify-end">
                &copy; Online Shop
            </footer>
        </>
    );
}
