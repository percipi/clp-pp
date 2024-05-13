import { PurchaseMachineContext } from '@/app/PurchaseProcess/PurchaseProcessContext';
import React from 'react';
import { PurchaseEvents } from '../machines/purchaseMachine';
import { capitalize } from '../utils';

interface Props {
    purchaseEvent: PurchaseEvents;
}

const NavButton = ({ purchaseEvent }: Props) => {
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <button
            className="btn btn-secondary"
            onClick={() => send(purchaseEvent)}
        >
            {capitalize(purchaseEvent.type)}
        </button>
    );
};

export default NavButton;
