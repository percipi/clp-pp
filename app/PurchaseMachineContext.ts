import { createContext } from 'react';
import {
    PurchaseContext as PurchaseStateContext,
    PurchaseEvents,
} from './machines/purchaseMachine';

export const PurchaseMachineContext = createContext(
    {} as {
        state: { context: PurchaseStateContext };
        send: (event: PurchaseEvents) => void;
    }
);
