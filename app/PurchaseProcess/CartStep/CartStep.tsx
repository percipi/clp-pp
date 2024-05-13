import React from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import { PurchaseMachineContext } from '@/app/PurchaseProcess/PurchaseProcessContext';
import Step from '../../components/Step';
import NextButton from '@/app/components/NextButton';
import { STEPS } from '@/app/consts';

const CartStep = () => {
    const products = PurchaseMachineContext.useSelector(
        (state) => state.context.products
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <>
            <Step.Nav currentStep={STEPS.cart}>
                <NextButton
                    onClick={() => send({ type: 'address' })}
                    disabled={!products.length}
                />
            </Step.Nav>
            <Step.Body names={['Your cart', 'Add product to cart']}>
                <ProductList />
                <AddProduct send={send} />
            </Step.Body>
        </>
    );
};

export default CartStep;
