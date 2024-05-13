import React from 'react';
import ShippingStep from './ShippingStep/ShippingStep';
import AddressStep from './AddressStep/AddressStep';
import CartStep from './CartStep/CartStep';
import SummaryStep from './SummaryStep/SummaryStep';
import CompletedStep from './CompletedStep/CompletedStep';
import PaymentStep from './PaymentStep/PaymentStep';
import { PurchaseMachineContext } from './PurchaseProcessContext';
import { PurchaseStates } from '../machines/purchaseMachine';

const PurchaseProcess = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    return (
        <>
            {state.matches('cart') && <CartStep />}
            {state.matches('address') && <AddressStep />}
            {state.hasTag('shipping') && <ShippingStep />}
            {state.hasTag('payment') && <PaymentStep />}
            {state.matches('summary') && <SummaryStep />}
            {state.hasTag('final') && <CompletedStep />}
        </>
    );
};

export default PurchaseProcess;
