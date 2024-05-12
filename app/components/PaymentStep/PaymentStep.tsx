import React from 'react';
import { PurchaseMachineContext } from '@/app/page';
import Step from '../Step';

const PaymentStep = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    const { send } = PurchaseMachineContext.useActorRef();
    return (
        <>
            <Step.Nav name="Payment">
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
            </Step.Nav>
            <Step.Body names={['Payment method']}>
                {state.matches('shipping_selected') ? (
                    <>
                        <p>Choose payment type:</p>
                        <ul>
                            <li>PayU</li>
                            <li>Blik</li>
                        </ul>
                    </>
                ) : (
                    <p>No product in the cart requires shipping</p>
                )}
            </Step.Body>
        </>
    );
};

export default PaymentStep;
