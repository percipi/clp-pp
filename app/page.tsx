'use client';

import { useMachine } from '@xstate/react';
import { purchaseMachine } from './machines/purchaseMachine';
import Shipping from './components/Shipping';

export default function Home() {
    const [state, send] = useMachine(purchaseMachine);

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
            {state.value === 'shipping_selected' && <Shipping send={send} />}
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
