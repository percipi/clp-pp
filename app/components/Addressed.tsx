import React from 'react';
import { Address, PurchaseEvents } from '../machines/purchaseMachine';

interface Props {
    send: (event: PurchaseEvents) => void;
    address: Address;
}

const Addressed = ({ send, address }: Props) => {
    return (
        <section>
            <h2>Address</h2>
            <ul>
                <li>Street: {address.street}</li>
                <li>City: {address.city}</li>
                <li>Country: {address.country}</li>
            </ul>
            <div className="flex gap-5">
                <button
                    className="btn"
                    onClick={() => send({ type: 'shipping' })}
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default Addressed;
