import React from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import { PurchaseMachineContext } from '@/app/page';

const Cart = () => {
    const products = PurchaseMachineContext.useSelector(
        (state) => state.context.products
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <>
            <h2>Cart</h2>
            <div className="flex gap-10">
                <ProductList />
                <AddProduct send={send} />
            </div>

            <button
                className="btn btn-primary"
                onClick={() => send({ type: 'address' })}
                disabled={!products.length}
            >
                Next
            </button>
        </>
    );
};

export default Cart;
