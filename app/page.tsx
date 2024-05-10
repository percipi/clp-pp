'use client';

import { useMachine } from '@xstate/react';
import { purchaseMachine } from './machines/purchaseMachine';
import Shipping from './components/Shipping';
import AddressStep from './components/AddressStep/AddressStep';
import Cart from './components/Cart/Cart';
import { PurchaseMachineContext } from './PurchaseMachineContext';
import CompletedStep from './components/CompletedStep/CompletedStep';

export default function Home() {
    const [state, send] = useMachine(purchaseMachine);

    return (
        <PurchaseMachineContext.Provider value={{ state, send }}>
            <main className="container w-full">
                <h1>purchasing process</h1>
                {state.matches('cart') && ( // TODO change to matches
                    <Cart />
                )}
                {state.matches('addressed') && <AddressStep />}
                {state.matches('shipping_selected') && <Shipping send={send} />}
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
            </main>
        </PurchaseMachineContext.Provider>
    );
}
