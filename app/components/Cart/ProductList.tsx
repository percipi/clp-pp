import { PurchaseMachineContext } from '@/app/PurchaseMachineContext';
import React, { useContext } from 'react';

const ProductList = () => {
    const {
        state: {
            context: { products },
        },
        send,
    } = useContext(PurchaseMachineContext);

    return (
        <section className="w-full my-10 ">
            <h3>Products</h3>

            {products.length > 0 ? (
                <div
                    className="overflow-x-auto h-96"
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
                                            className="btn btn-warning"
                                        >
                                            DELETE
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
