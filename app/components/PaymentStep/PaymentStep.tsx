import React from 'react';
import { PurchaseMachineContext } from '@/app/page';
import Step from '../Step';
import { PAYMENTS } from '@/app/machines/purchaseMachine';

const PAYMENT_FORM_ID = 'address-form';

const PaymentStep = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    const { payment } = state.context;
    const { send } = PurchaseMachineContext.useActorRef();
    return (
        <>
            <Step.Nav name="Payment">
                <div className="flex gap-5">
                    <button
                        className="btn btn-secondary"
                        onClick={() => send({ type: 'address' })}
                    >
                        Address
                    </button>

                    {state.matches('shipping_selected') ? (
                        <button
                            className="btn btn-primary"
                            form={PAYMENT_FORM_ID}
                            type="submit"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={() => send({ type: 'complete' })}
                        >
                            Next
                        </button>
                    )}
                </div>
            </Step.Nav>
            <Step.Body names={['Payment method']}>
                {state.matches('payment_selected') ? (
                    <form
                        id={PAYMENT_FORM_ID}
                        onSubmit={(e) => {
                            e.preventDefault();
                            send({ type: 'complete' });
                        }}
                        className="form-control max-w-96"
                    >
                        <select
                            onChange={(e) =>
                                send({
                                    type: 'change_payment',
                                    value: e.target.value as PAYMENTS,
                                })
                            }
                            className="select select-bordered"
                            id="shipping"
                            value={payment}
                            required
                        >
                            {['', ...Object.values(PAYMENTS)].map((payment) => (
                                <option value={payment}>
                                    {payment
                                        ? payment
                                        : '--- Select your payment method ---'}
                                </option>
                            ))}
                        </select>
                    </form>
                ) : (
                    <p>No product in the cart requires payment.</p>
                )}
            </Step.Body>
        </>
    );
};

export default PaymentStep;
