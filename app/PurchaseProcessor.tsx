import React from 'react';
import Shipping from './components/ShippingStep/Shipping';
import AddressStep from './components/AddressStep/AddressStep';
import Cart from './components/CartStep/Cart';
import CompletedStep from './components/CompletedStep/CompletedStep';
import FinalizingStep from './components/FinalizingStep/FinalizingStep';
import FinalizedStep from './components/FinalizedStep/FinalizedStep';
import FinalizingFailedStep from './components/FinalizingFailedStep/FinalizingFailedStep';
import { PurchaseMachineContext } from './page';

const PurchaseProcessor = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <main className="container w-full">
            <h1>purchasing process</h1>
            {state.matches('cart') && ( // TODO change to matches
                <Cart />
            )}
            {state.matches('addressed') && <AddressStep />}
            {state.hasTag('shipping') && <Shipping />}
            {state.matches('payment_selected') && (
                <section>
                    <h2>Payment</h2>
                    <p>Choose payment type:</p>
                    <ul>
                        <li>PayU</li>
                        <li>Blik</li>
                    </ul>
                    <div className="flex gap-5">
                        <button
                            className="btn"
                            onClick={() => send({ type: 'address' })}
                        >
                            Back to address
                        </button>
                        <button
                            className="btn"
                            onClick={() => send({ type: 'complete' })}
                        >
                            Complete
                        </button>
                    </div>
                </section>
            )}
            {state.matches('completed') && <CompletedStep />}
            {state.matches('finalizing_purchase') && <FinalizingStep />}
            {state.matches('purchase_finalized') && <FinalizedStep />}
            {state.matches('finalizing_failed') && <FinalizingFailedStep />}
        </main>
    );
};

export default PurchaseProcessor;
