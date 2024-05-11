import React from 'react';
import AddressForm from './AddressForm';
import { PurchaseMachineContext } from '@/app/page';

const ADDRESS_FORM_ID = 'address-form';

const AddressStep = () => {
    const address = PurchaseMachineContext.useSelector(
        (state) => state.context.address
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <section>
            <h2>Address</h2>
            <AddressForm
                id={ADDRESS_FORM_ID}
                address={address}
                send={send}
            />
            <div className="flex gap-5">
                <button
                    type="submit"
                    form={ADDRESS_FORM_ID}
                    className="btn"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default AddressStep;
