import React from 'react';
import { PurchaseEvents } from '../machines/purchaseMachine';

interface Props {
    send: (event: PurchaseEvents) => void;
}

const Shipping = ({ send }: Props) => {
    return (
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
                    onClick={() => send({ type: 'select_payment' })}
                >
                    Go to payment
                </button>
            </div>
        </section>
    );
};

export default Shipping;
