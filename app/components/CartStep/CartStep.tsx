import React from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import { PurchaseMachineContext } from '@/app/page';
import Step from '../Step';

const CartStep = () => {
    const products = PurchaseMachineContext.useSelector(
        (state) => state.context.products
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <>
            <Step.Nav name="Cart">
                <button
                    className="btn btn-primary"
                    onClick={() => send({ type: 'address' })}
                    disabled={!products.length}
                >
                    Next
                </button>
            </Step.Nav>
            <Step.Body names={['Products', 'Add product']}>
                <ProductList />
                <AddProduct send={send} />
            </Step.Body>
        </>
    );
};

export default CartStep;
