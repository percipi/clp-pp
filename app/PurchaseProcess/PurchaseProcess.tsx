import React from 'react';
import ShippingStep from './ShippingStep/ShippingStep';
import AddressStep from './AddressStep/AddressStep';
import CartStep from './CartStep/CartStep';
import SummaryStep from './SummaryStep/SummaryStep';
import CompletedStep from './CompletedStep/CompletedStep';
import PaymentStep from './PaymentStep/PaymentStep';
import { PurchaseMachineContext } from './PurchaseProcessContext';

const PurchaseProcess = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    switch (true) {
        case state.matches('cart'):
            return <CartStep />;
        case state.matches('address'):
            return <AddressStep />;
        case state.hasTag('shipping'):
            return <ShippingStep />;
        case state.hasTag('payment'):
            return <PaymentStep />;
        case state.matches('summary'):
            return <SummaryStep />;
        case state.hasTag('final'):
            return <CompletedStep />;
        default:
            return <CartStep />;
    }
};

export default PurchaseProcess;
