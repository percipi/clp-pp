import React from 'react';
import AddressForm from './AddressForm';

import Step from '../../components/Step';
import { PurchaseMachineContext } from '@/app/PurchaseProcess/PurchaseProcessContext';
import { STEPS } from '@/app/machines/purchaseMachine';
import NextButton from '@/app/components/NextButton';
const ADDRESS_FORM_ID = 'address-form';

const AddressStep = () => {
    const address = PurchaseMachineContext.useSelector(
        (state) => state.context.address
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <>
            <Step.Nav currentStep={STEPS.address}>
                <NextButton form={ADDRESS_FORM_ID} />
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
