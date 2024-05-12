import React from 'react';
import AddressForm from './AddressForm';
import { PurchaseMachineContext } from '@/app/page';
import StepNav from '../Step/StepNav';
import Step from '../Step';

const ADDRESS_FORM_ID = 'address-form';

const AddressStep = () => {
    const address = PurchaseMachineContext.useSelector(
        (state) => state.context.address
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <>
            <Step.Nav name="Address">
                <button
                    type="submit"
                    form={ADDRESS_FORM_ID}
                    className="btn btn-primary"
                >
                    Next
                </button>
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
