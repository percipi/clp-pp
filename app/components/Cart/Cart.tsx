import React, { useContext } from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import { PurchaseMachineContext } from '@/app/PurchaseMachineContext';

const Cart = () => {
    const { send } = useContext(PurchaseMachineContext);

    return (
        <>
            <h2>Cart</h2>
            <div className="flex gap-10">
                <ProductList />
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
