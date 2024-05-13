import React from 'react';
import { PurchaseMachineContext } from '@/app/PurchaseProcess/PurchaseProcessContext';
import Step from '../../components/Step';
import { COUNTRIES, SHIPPING, STEPS } from '@/app/machines/purchaseMachine';

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
            <Step.Nav currentStep={STEPS.shipping}>
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
                                <option
                                    key={shipping}
                                    value={shipping}
                                >
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
