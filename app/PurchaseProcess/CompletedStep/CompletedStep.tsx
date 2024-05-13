import { PurchaseContext } from '@/app/machines/purchaseMachine';
import React from 'react';
import { PurchaseMachineContext } from '../PurchaseProcessContext';
import Step from '@/app/components/Step';

export async function sendPurchase(purchase: PurchaseContext): Promise<string> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('Sending:', purchase);
            if (Math.random() < 0.6) {
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
                <Step.Body names={['Completed']}>
                    <p>
                        Your order has been processed successfully. Thank you
                        for shopping at Online Shop!
                    </p>
                </Step.Body>
            );
        case state.matches('error_on_completing'):
            return (
                <Step.Body names={['Error on completing']}>
                    <>
                        <p>
                            An error has occurred while processing your order.
                            Please try again in a moment.
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => send({ type: 'complete' })}
                        >
                            Retry
                        </button>
                    </>
                </Step.Body>
            );
        default:
            return (
                <Step.Body names={['Completing...']}>
                    <p>
                        Your order is sent to the server. This can take a few
                        seconds...
                    </p>
                </Step.Body>
            );
    }
};

export default CompletedStep;
