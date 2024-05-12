import React from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import { PurchaseMachineContext } from '@/app/page';
import StepNav from '../StepNav';
import StepBody from '../StepBody';

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
            <StepBody>
                <ProductList />
                <AddProduct send={send} />
            </StepBody>
        </>
    );
};

export default Cart;
