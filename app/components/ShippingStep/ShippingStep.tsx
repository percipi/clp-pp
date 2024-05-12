import React from 'react';
import { PurchaseMachineContext } from '@/app/page';
import Step from '../Step';
import { COUNTRIES, SHIPPING } from '@/app/machines/purchaseMachine';

const SHIPPING_FORM_ID = 'address-form';

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
                        Address
                    </button>
                    {state.matches('shipping_selected') ? (
                        <button
                            className="btn btn-primary"
                            type="submit"
                            form={SHIPPING_FORM_ID}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => send({ type: 'payment' })}
                        >
                            Next
                        </button>
                    )}
                </div>
            </Step.Nav>
            <Step.Body names={['Shipping method']}>
                {state.matches('shipping_selected') ? (
                    <form
                        id={SHIPPING_FORM_ID}
                        onSubmit={(e) => {
                            e.preventDefault();
                            send({ type: 'payment' });
                        }}
                        className="form-control max-w-96"
                    >
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
                                        : '--- Select your shipping method ---'}
                                </option>
                            ))}
                        </select>
                    </form>
                ) : (
                    <p>No product in the cart requires shipping.</p>
                )}
            </Step.Body>
        </>
    );
};

export default ShippingStep;