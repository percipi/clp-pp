'use client';

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
        shipping_selected: {},
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
    return (
        <main className="prose">
            <h1>purchasing process</h1>
            <h2>cart</h2>
            <ul>
                <li>Product 1</li>
                <li>Product 2</li>
                <li>Product 3</li>
            </ul>
            <button
                className="btn"
                onClick={() => actor.send({ type: 'address' })}
            >
                Go to address
            </button>
        </main>
    );
}
