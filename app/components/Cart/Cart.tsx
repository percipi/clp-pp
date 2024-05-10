import React from 'react';
import { Product, PurchaseEvents } from '../../machines/purchaseMachine';
import AddProduct from './AddProduct';
import ProductList from './ProductList';

interface Props {
    send: (event: PurchaseEvents) => void;
    products: Product[];
}

const Cart = ({ send, products }: Props) => {
    return (
        <>
            <h2>Cart</h2>
            <div className="flex gap-10">
                <ProductList products={products} />
                <AddProduct send={send} />
            </div>
            <nav btm-nav>
                <button
                    className="btn btn-primary"
                    onClick={() => send({ type: 'address' })}
                >
                    Next
                </button>
            </nav>
        </>
    );
};

export default Cart;
