import React from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import { PurchaseMachineContext } from '@/app/page';
import StepNav from '../StepNav';

const Cart = () => {
    const products = PurchaseMachineContext.useSelector(
        (state) => state.context.products
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <>
            <StepNav name="Cart">
                <button
                    className="btn btn-primary"
                    onClick={() => send({ type: 'address' })}
                    disabled={!products.length}
                >
                    Next
                </button>
            </StepNav>
            <div className="flex gap-5 items-start">
                <ProductList />
                <AddProduct send={send} />
            </div>
        </>
    );
};

export default Cart;
