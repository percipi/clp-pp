import { PurchaseContext } from '@/app/machines/purchaseMachine';
import React from 'react';

export async function sendPurchase(purchase: PurchaseContext): Promise<string> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('Sending:', purchase);
            if (Math.random() < 0.5) {
                rej();
                return;
            }

            res('OK!');
        }, 1000);
    });
}

const FinalizingStep = () => {
    return (
        <>
            <h2>Finalizing</h2>
            <p>Your order is being processed...</p>
        </>
    );
};

export default FinalizingStep;
