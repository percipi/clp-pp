import React from 'react';
import ShippingStep from './components/ShippingStep/ShippingStep';
import AddressStep from './components/AddressStep/AddressStep';
import CartStep from './components/CartStep/CartStep';
import CompletedStep from './components/CompletedStep/CompletedStep';
import FinalizingStep from './components/FinalizingStep/FinalizingStep';
import FinalizedStep from './components/FinalizedStep/FinalizedStep';
import FinalizingFailedStep from './components/FinalizingFailedStep/FinalizingFailedStep';
import PaymentStep from './components/PaymentStep/PaymentStep';
import { PurchaseMachineContext } from './page';

const PurchaseProcessor = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);

    return (
        <main className="container mx-auto flex flex-col gap-5">
            <h1 className="bg-white p-3 m-0">purchasing process</h1>
            {state.matches('cart') && <CartStep />}
            {state.matches('addressed') && <AddressStep />}
            {state.hasTag('shipping') && <ShippingStep />}
            {state.matches('payment_selected') && <PaymentStep />}
            {state.matches('completed') && <CompletedStep />}
            {state.matches('finalizing_purchase') && <FinalizingStep />}
            {state.matches('purchase_finalized') && <FinalizedStep />}
            {state.matches('finalizing_failed') && <FinalizingFailedStep />}
        </main>
    );
};

export default PurchaseProcessor;
