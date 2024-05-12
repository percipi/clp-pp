import { PurchaseMachineContext } from '@/app/page';
import React from 'react';

const ProductList = () => {
    const products = PurchaseMachineContext.useSelector(
        (state) => state.context.products
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <section className="grow p-3 bg-white">
            <h3>Products</h3>

            {products.length > 0 ? (
                <div
                    className="overflow-x-auto"
                    style={{ scrollbarGutter: 'stable' }}
                >
                    <table className="table table-zebra table-pin-rows">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Shipping required</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        {product.isShippingRequired
                                            ? 'YES'
                                            : 'NO'}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                send({
                                                    type: 'delete_product',
                                                    value: product.id,
                                                })
                                            }
                                            className="btn btn-xs btn-circle btn-ghost"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <span>Cart is empty</span>
            )}
        </section>
    );
};

export default ProductList;
