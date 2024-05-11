import React from 'react';
import { PurchaseMachineContext } from '@/app/page';

const Shipping = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    const { send } = PurchaseMachineContext.useActorRef();
    return (
        <section>
            <h2>Shipping</h2>
            {state.matches('shipping_selected') ? (
                <>
                    <p>Choose shipping type:</p>
                    <ul>
                        <li>DHL</li>
                        <li>UDP</li>
                    </ul>
                </>
            ) : (
                <p>No product in the cart requires shipping</p>
            )}
            <div className="flex gap-5">
                <button
                    className="btn"
                    onClick={() => send({ type: 'address' })}
                >
                    Back to address
                </button>
                <button
                    className="btn"
                    onClick={() => send({ type: 'payment' })}
                >
                    Go to payment
                </button>
            </div>
        </section>
    );
};

export default Shipping;
