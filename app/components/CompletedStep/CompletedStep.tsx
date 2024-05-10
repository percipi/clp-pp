import { PurchaseMachineContext } from '@/app/PurchaseMachineContext';
import React, { useContext } from 'react';

const CompletedStep = () => {
    const {
        state: { context },
    } = useContext(PurchaseMachineContext);
    const {
        products,
        address: { street, city, country },
    } = context;
    return (
        <>
            <h2>Completed</h2>
            <section className="mb-5">
                <h3>Products</h3>
                <table className="table table-zebra table-pin-rows">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Shipping required</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    {product.isShippingRequired ? 'YES' : 'NO'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <section className="mb-5">
                <h3>Address</h3>
                <p>Street: {street}</p>
                <p>City: {city}</p>
                <p>Country: {country}</p>
            </section>
            <section className="mb-5">
                <h3>Payment</h3>
                <p>Blik</p>
            </section>
            <section className="mb-5">
                <h3>Shipment</h3>
                <p>UDP</p>
            </section>
            <div className="flex gap-5">
                <button
                    className="btn"
                    onClick={() => console.log(context)}
                >
                    Send?
                </button>
            </div>
        </>
    );
};

export default CompletedStep;
