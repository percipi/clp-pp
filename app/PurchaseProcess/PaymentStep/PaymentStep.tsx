import React from 'react';
import { PurchaseMachineContext } from '@/app/PurchaseProcess/PurchaseProcessContext';
import Step from '../../components/Step';
import { PAYMENTS, STEPS } from '@/app/machines/purchaseMachine';

const PAYMENT_FORM_ID = 'address-form';

const PaymentStep = () => {
    const state = PurchaseMachineContext.useSelector((state) => state);
    const { payment } = state.context;
    const { send } = PurchaseMachineContext.useActorRef();
    return (
        <>
            <Step.Nav currentStep={STEPS.payment}>
                {state.matches('payment_selected') ? (
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
                        onClick={() => send({ type: 'summary' })}
                    >
                        Next
                    </button>
                )}
            </Step.Nav>
            <Step.Body names={['Payment method']}>
                {state.matches('payment_selected') ? (
                    <form
                        id={PAYMENT_FORM_ID}
                        onSubmit={(e) => {
                            e.preventDefault();
                            send({ type: 'summary' });
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
                                <option
                                    key={payment}
                                    value={payment}
                                >
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
