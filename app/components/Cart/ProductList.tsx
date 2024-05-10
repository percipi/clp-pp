import { Product, purchaseMachine } from '@/app/machines/purchaseMachine';
import { useMachine } from '@xstate/react';
import React from 'react';

interface Props {
    products: Product[];
}

const ProductList = ({ products }: Props) => {
    return (
        <section className="w-full my-10">
            <h3>Products</h3>
            <div className="overflow-x-auto h-96">
                <table className="table table-zebra table-pin-rows">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Shipping required</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    {product.isShippingRequired ? 'YES' : 'NO'}
                                </td>
                                <td>
                                    <button className="btn btn-warning">
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ProductList;
