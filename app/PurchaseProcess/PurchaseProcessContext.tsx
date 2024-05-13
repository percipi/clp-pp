'use client';
import React from 'react';
import { purchaseMachine } from '../machines/purchaseMachine';
import { createActorContext } from '@xstate/react';
import PurchaseProcess from './PurchaseProcess';

export const PurchaseMachineContext = createActorContext(purchaseMachine);

const PurchaseProcessContext = () => {
    return (
        <PurchaseMachineContext.Provider>
            <PurchaseProcess />
        </PurchaseMachineContext.Provider>
    );
};

export default PurchaseProcessContext;
