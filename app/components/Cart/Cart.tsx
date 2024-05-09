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
        <section>
            <h2>Cart</h2>
            <ProductList products={products} />
            <AddProduct send={send} />
            <button
                className="btn btn-primary"
                onClick={() => send({ type: 'address' })}
            >
                Next
            </button>
        </section>
    );
};

export default Cart;
