import React from 'react';
import { PurchaseMachineContext } from '@/app/page';
import Step from '../Step';
import { COUNTRIES, SHIPPING } from '@/app/machines/purchaseMachine';

type ShippingForCountry = {
    [key in COUNTRIES]: SHIPPING[];
};

const shippingMethodsForCountry: ShippingForCountry = {
    [COUNTRIES.POLAND]: [SHIPPING.POLISH_EXPRESS, SHIPPING.WORLDWIDE_DELIVERY],
    [COUNTRIES.USA]: [SHIPPING.WORLDWIDE_DELIVERY],
} as const;

const ShippingStep = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    const { shipping } = state.context;
    const { country } = state.context.address;
    const shippingMethods =
        country !== '' ? shippingMethodsForCountry[country] : [];
    const { send } = PurchaseMachineContext.useActorRef();
    return (
        <>
            <Step.Nav name="Shipping">
                <div className="flex gap-5 btn-secondary">
                    <button
                        className="btn"
                        onClick={() => send({ type: 'address' })}
                    >
                        Back to address
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => send({ type: 'payment' })}
                    >
                        Next
                    </button>
                </div>
            </Step.Nav>
            <Step.Body names={['Shipping method']}>
                {state.matches('shipping_selected') ? (
                    <select
                        onChange={(e) =>
                            send({
                                type: 'change_shipping',
                                value: e.target.value as SHIPPING,
                            })
                        }
                        className="select select-bordered"
                        id="shipping"
                        value={shipping}
                        required
                    >
                        {['', ...shippingMethods].map((shipping) => (
                            <option value={shipping}>
                                {shipping
                                    ? shipping
                                    : '--- Select you shipping method ---'}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p>No product in the cart requires shipping</p>
                )}
            </Step.Body>
        </>
    );
};

export default ShippingStep;
