'use client';

import { createActorContext } from '@xstate/react';
import PurchaseProcessor from './PurchaseProcessor';
import { purchaseMachine } from './machines/purchaseMachine';

export const PurchaseMachineContext = createActorContext(purchaseMachine);

export default function Home() {
    return (
        <PurchaseMachineContext.Provider>
            <PurchaseProcessor />
        </PurchaseMachineContext.Provider>
    );
}
