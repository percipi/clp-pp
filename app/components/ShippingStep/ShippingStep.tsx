import React from 'react';
import { PurchaseMachineContext } from '@/app/page';
import Step from '../Step';

const ShippingStep = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    const { send } = PurchaseMachineContext.useActorRef();
    return (
        <>
            <Step.Nav name="Shipping">
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
            </Step.Nav>
            <Step.Body names={['Shipping method']}>
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
            </Step.Body>
        </>
    );
};

export default ShippingStep;
