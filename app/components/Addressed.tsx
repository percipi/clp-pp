import React from 'react';
import { PurchaseEvents } from '../machines/purchaseMachine';

interface Props {
    send: (event: PurchaseEvents) => void;
}

const Addressed = ({ send }: Props) => {
    return (
        <section>
            <h2>Address</h2>
            <ul>
                <li>ul. Krakowska 45/5</li>
                <li>61-893 Poznań</li>
                <li>Polska</li>
            </ul>
            <div className="flex gap-5">
                <button
                    className="btn"
                    onClick={() => send({ type: 'select_shipping' })}
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default Addressed;
