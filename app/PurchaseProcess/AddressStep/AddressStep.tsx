import React from 'react';
import AddressForm from './AddressForm';

import Step from '../../components/Step';
import { PurchaseMachineContext } from '@/app/PurchaseProcess/PurchaseProcessContext';
import { backToPreviousStepLogic } from '@/app/machines/purchaseMachine';
import NavButton from '@/app/components/NavButton';

const ADDRESS_FORM_ID = 'address-form';

const AddressStep = () => {
    const address = PurchaseMachineContext.useSelector(
        (state) => state.context.address
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <>
            <Step.Nav name="Address">
                <div className="flex gap-5">
                    {backToPreviousStepLogic['address'].map((event) => (
                        <NavButton
                            key={event.type}
                            purchaseEvent={event}
                        />
                    ))}
                    <button
                        type="submit"
                        form={ADDRESS_FORM_ID}
                        className="btn btn-primary"
                    >
                        Next
                    </button>
                </div>
            </Step.Nav>
            <Step.Body names={['Shipping address']}>
                <AddressForm
                    id={ADDRESS_FORM_ID}
                    address={address}
                    send={send}
                />
            </Step.Body>
        </>
    );
};

export default AddressStep;
