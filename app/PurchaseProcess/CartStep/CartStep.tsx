import React from 'react';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import { PurchaseMachineContext } from '@/app/PurchaseProcess/PurchaseProcessContext';
import Step from '../../components/Step';
import { STEPS } from '@/app/machines/purchaseMachine';
import NextButton from '@/app/components/NextButton';

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
            <Step.Body names={['Products', 'Add product']}>
                <ProductList />
                <AddProduct send={send} />
            </Step.Body>
        </>
    );
};

export default CartStep;
