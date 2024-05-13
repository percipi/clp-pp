import { PurchaseContext } from '@/app/machines/purchaseMachine';
import React from 'react';
import { PurchaseMachineContext } from '../PurchaseProcessContext';
import Step from '@/app/components/Step';

export async function sendPurchase(purchase: PurchaseContext): Promise<string> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('Sending:', purchase);
            if (Math.random() < 0.8) {
                rej();
                return;
            }

            res('OK!');
        }, 3000);
    });
}

const CompletedStep = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    const { send } = PurchaseMachineContext.useActorRef();

    switch (true) {
        case state.matches('completed'):
            return (
                <Step.Body names={['Order completed']}>
                    <p>Your order was completed successfully!</p>
                </Step.Body>
            );
        case state.matches('error_on_completing'):
            return (
                <Step.Body names={['Error']}>
                    <>
                        <p>Wait and try again.</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => send({ type: 'complete' })}
                        >
                            Send order
                        </button>
                    </>
                </Step.Body>
            );
        default:
            return (
                <Step.Body names={['Ordering...']}>
                    <p>Your order is being processed...</p>
                </Step.Body>
            );
    }
};

export default CompletedStep;
