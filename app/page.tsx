'use client';

import { useMachine } from '@xstate/react';
import { createActor, createMachine } from 'xstate';

const toggleMachine = createMachine({
    id: 'toggle',
    initial: 'cart',
    states: {
        cart: {
            on: { address: 'adressed' },
        },
        adressed: {
            on: { select_shipping: 'shipping_selected' },
        },
        shipping_selected: {
            on: { address: 'adressed', select_payment: 'payment_selected' },
        },
        payment_selected: {
            on: { address: 'adressed', complete: 'completed' },
        },
        completed: {},
    },
});

const actor = createActor(toggleMachine);

// Subscribe to snapshots (emitted state changes) from the actor
actor.subscribe((snapshot) => {
    console.log('Value:', snapshot.value);
});

// Start the actor
actor.start(); // logs 'Inactive'

export default function Home() {
    const [state, send] = useMachine(toggleMachine);

    return (
        <main className="prose">
            <h1>purchasing process</h1>
            {state.value === 'cart' && (
                <section>
                    <h2>Cart</h2>
                    <ul>
                        <li>Product 1</li>
                        <li>Product 2</li>
                        <li>Product 3</li>
                    </ul>
                    <button
                        className="btn"
                        onClick={() => send({ type: 'address' })}
                    >
                        Go to address
                    </button>
                </section>
            )}
            {state.value === 'adressed' && (
                <section>
                    <h2>Address</h2>
                    <ul>
                        <li>ul. Krakowska 45/5</li>
                        <li>61-893 Poznań</li>
                        <li>Polska</li>
                    </ul>
                    <div className="flex gap-5">
                        <button
                            className="btn"
                            disabled
                            onClick={() => send({ type: 'select_shipping' })}
                        >
                            Skip shipping
                        </button>
                        <button
                            className="btn"
                            onClick={() => send({ type: 'select_shipping' })}
                        >
                            Go to shipping
                        </button>
                    </div>
                </section>
            )}
            {state.value === 'shipping_selected' && (
                <section>
                    <h2>Shipping</h2>
                    <p>Choose shipping type:</p>
                    <ul>
                        <li>DHL</li>
                        <li>UDP</li>
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
                            disabled
                            onClick={() => send({ type: 'skip_payment' })}
                        >
                            Skip payment
                        </button>
                        <button
                            className="btn"
                            onClick={() => send({ type: 'select_payment' })}
                        >
                            Go to payment
                        </button>
                    </div>
                </section>
            )}
            {state.value === 'payment_selected' && (
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
            {state.value === 'completed' && (
                <section>
                    <h2>Completed</h2>
                    <p>Products</p>
                    <ul>
                        <li>Product 1</li>
                        <li>Product 2</li>
                        <li>...</li>
                    </ul>
                    <p>Payment: Blik</p>
                    <p>Shipment: UDP</p>
                    <div className="flex gap-5">
                        <button
                            className="btn"
                            onClick={() => send({ type: 'address' })}
                        >
                            Send?
                        </button>
                    </div>
                </section>
            )}
        </main>
    );
}
