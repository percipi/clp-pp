'use client';

import { useMachine } from '@xstate/react';
import { purchaseMachine } from './machines/purchaseMachine';
import Shipping from './components/Shipping';
import Addressed from './components/Addressed';
import Cart from './components/Cart/Cart';

export default function Home() {
    const [state, send] = useMachine(purchaseMachine);

    return (
        <main className="container w-full">
            <h1>purchasing process</h1>
            {state.value === 'cart' && ( // TODO change to matches
                <Cart
                    products={state.context.products}
                    send={send}
                />
            )}
            {state.value === 'addressed' && (
                <Addressed
                    address={state.context.address}
                    send={send}
                />
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
