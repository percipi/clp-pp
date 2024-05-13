import { PurchaseMachineContext } from '@/app/PurchaseProcess/PurchaseProcessContext';
import React from 'react';
import { capitalize } from '../utils';
import { PurchaseEvents } from '../machines/purchaseMachine';

interface Props {
    step: string;
    disabled: boolean;
    isCurrent: boolean;
}

const NavButton = ({ step, disabled, isCurrent }: Props) => {
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <button
            disabled={disabled}
            className={`btn max-sm:w-full  ${
                isCurrent
                    ? 'btn-accent cursor-default no-animation'
                    : 'btn-secondary'
            } `}
            onClick={
                isCurrent
                    ? (x) => x
                    : () => send({ type: step } as PurchaseEvents)
            }
        >
            {capitalize(step)}
        </button>
    );
};

export default NavButton;
