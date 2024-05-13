import { PurchaseMachineContext } from '@/app/PurchaseProcess/PurchaseProcessContext';
import React from 'react';
import Step from '../../components/Step';
import ProductsTable from '../ProductsTable';
import { backToPreviousStepLogic } from '@/app/machines/purchaseMachine';
import NavButton from '@/app/components/NavButton';

const CompletedStep = () => {
    const {
        products,
        shipping,
        payment,
        address: { street, city, country },
    } = PurchaseMachineContext.useSelector((state) => state.context);
    const { send } = PurchaseMachineContext.useActorRef();
    return (
        <>
            <Step.Nav name="Summary">
                <div className="flex gap-5">
                    {backToPreviousStepLogic['completed'].map((event) => (
                        <NavButton
                            key={event.type}
                            purchaseEvent={event}
                        />
                    ))}
                </div>
            </Step.Nav>
            <Step.Body names={['Purchase order summary']}>
                <div>
                    <section className="mb-5">
                        <h4>Products</h4>
                        <ProductsTable products={products} />
                    </section>
                    <section className="mb-5">
                        <h4>Address</h4>
                        <p>Street: {street}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </section>
                    <section className="mb-5">
                        <h4>Payment</h4>
                        <p>
                            {payment ||
                                'No product in the cart requires payment.'}
                        </p>
                    </section>
                    <section className="mb-5">
                        <h4>Shipping</h4>
                        <p>
                            {shipping ||
                                'No product in the cart requires shipping.'}
                        </p>
                    </section>
                    <div className="flex gap-5">
                        <button
                            className="btn btn-primary"
                            onClick={() => send({ type: 'finalize_purchase' })}
                        >
                            Send order
                        </button>
                    </div>
                </div>
            </Step.Body>
        </>
    );
};

export default CompletedStep;
