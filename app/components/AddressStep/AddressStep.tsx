import React, { useContext } from 'react';
import AddressForm from './AddressForm';
import { PurchaseMachineContext } from '@/app/PurchaseMachineContext';

const ADDRESS_FORM_ID = 'address-form';

const AddressStep = () => {
    const {
        state: {
            context: { address },
        },
        send,
    } = useContext(PurchaseMachineContext);

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
