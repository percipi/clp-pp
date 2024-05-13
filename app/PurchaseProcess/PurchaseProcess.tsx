import React from 'react';
import ShippingStep from './ShippingStep/ShippingStep';
import AddressStep from './AddressStep/AddressStep';
import CartStep from './CartStep/CartStep';
import SummaryStep from './SummaryStep/SummaryStep';
import FinalizingStep from './FinalizingStep/FinalizingStep';
import FinalizedStep from './FinalizedStep/FinalizedStep';
import FinalizingFailedStep from './FinalizingFailedStep/FinalizingFailedStep';
import PaymentStep from './PaymentStep/PaymentStep';
import { PurchaseMachineContext } from './PurchaseProcessContext';
import { PurchaseStates } from '../machines/purchaseMachine';

const PurchaseProcess = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    return (
        <>
            {state.matches(PurchaseStates.cart) && <CartStep />}
            {state.matches(PurchaseStates.address) && <AddressStep />}
            {state.hasTag('shipping') && <ShippingStep />}
            {state.hasTag('payment') && <PaymentStep />}
            {state.matches('summary') && <SummaryStep />}
            {state.matches('finalizing_purchase') && <FinalizingStep />}
            {state.matches('purchase_finalized') && <FinalizedStep />}
            {state.matches('finalizing_failed') && <FinalizingFailedStep />}
        </>
    );
};

export default PurchaseProcess;
