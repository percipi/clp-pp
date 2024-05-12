import React from 'react';
import AddressForm from './AddressForm';
import { PurchaseMachineContext } from '@/app/page';
import StepNav from '../StepNav';

const ADDRESS_FORM_ID = 'address-form';

const AddressStep = () => {
    const address = PurchaseMachineContext.useSelector(
        (state) => state.context.address
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <>
            <StepNav name="Address">
                <button
                    type="submit"
                    form={ADDRESS_FORM_ID}
                    className="btn btn-primary"
                >
                    Next
                </button>
            </StepNav>
            <AddressForm
                id={ADDRESS_FORM_ID}
                address={address}
                send={send}
            />
        </>
    );
};

export default AddressStep;
