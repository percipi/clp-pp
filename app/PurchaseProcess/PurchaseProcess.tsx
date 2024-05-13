import React from 'react';
import ShippingStep from './ShippingStep/ShippingStep';
import AddressStep from './AddressStep/AddressStep';
import CartStep from './CartStep/CartStep';
import CompletedStep from './SummaryStep/SummaryStep';
import FinalizingStep from './FinalizingStep/FinalizingStep';
import FinalizedStep from './FinalizedStep/FinalizedStep';
import FinalizingFailedStep from './FinalizingFailedStep/FinalizingFailedStep';
import PaymentStep from './PaymentStep/PaymentStep';
import { PurchaseMachineContext } from './PurchaseProcessContext';

const PurchaseProcess = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    return (
        <>
            {state.matches('cart') && <CartStep />}
            {state.matches('addressed') && <AddressStep />}
            {state.hasTag('shipping') && <ShippingStep />}
            {state.hasTag('payment') && <PaymentStep />}
            {state.matches('completed') && <CompletedStep />}
            {state.matches('finalizing_purchase') && <FinalizingStep />}
            {state.matches('purchase_finalized') && <FinalizedStep />}
            {state.matches('finalizing_failed') && <FinalizingFailedStep />}
        </>
    );
};

export default PurchaseProcess;
