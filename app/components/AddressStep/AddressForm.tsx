import { Address, PurchaseEvents } from '@/app/machines/purchaseMachine';

import React from 'react';

interface Props {
    send: (event: PurchaseEvents) => void;
    address: Address;
    id: string;
}

const AddressForm = ({
    id,
    address: { street, city, country },
    send,
}: Props) => {
    return (
        <section className="grow p-3 bg-white">
            <h3>Shipping address</h3>
            <form
                id={id}
                onSubmit={(e) => {
                    e.preventDefault();
                    send({ type: 'shipping' });
                }}
                className="form-control max-w-96"
            >
                <div className="form-control">
                    <label
                        htmlFor="name"
                        className="label cursor-pointer"
                    >
                        <div className="label-text">Street</div>
                        <input
                            type="text"
                            className="input input-bordered"
                            id="name"
                            onChange={(e) =>
                                send({
                                    type: 'change_street',
                                    value: e.target.value,
                                })
                            }
                            maxLength={40}
                            required
                            value={street}
                        />
                    </label>
                </div>
                <label
                    htmlFor="city"
                    className="label cursor-pointer"
                >
                    <span className="label-text">City</span>
                    <input
                        type="text"
                        className="input input-bordered"
                        id="city"
                        onChange={(e) =>
                            send({
                                type: 'change_city',
                                value: e.target.value,
                            })
                        }
                        value={city}
                        maxLength={25}
                        required
                    />
                </label>
                <label
                    htmlFor="country"
                    className="label cursor-pointer"
                >
                    <span className="label-text">Country</span>
                    <select
                        onChange={(e) =>
                            send({
                                type: 'change_country',
                                value: e.target.value,
                            })
                        }
                        className="select select-bordered"
                        id="country"
                        value={country}
                        required
                    >
                        <option value="">--- Select you country ---</option>
                        <option value="Poland">Poland</option>
                        <option value="USA">USA</option>
                    </select>
                </label>
            </form>
        </section>
    );
};

export default AddressForm;
