import React from 'react';
import { Product, PurchaseEvents } from '../machines/purchaseMachine';

interface Props {
    send: (event: PurchaseEvents) => void;
    products: Product[];
}

const Cart = ({ send, products }: Props) => {
    return (
        <section>
            <h2>Cart</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} | Price: {product.price}$ | Requires
                        shipping: {product.isShippingRequired ? 'YES' : 'NO'}
                    </li>
                ))}
            </ul>
            <button
                className="btn"
                onClick={() => send({ type: 'address' })}
            >
                Go to address
            </button>
        </section>
    );
};

export default Cart;
