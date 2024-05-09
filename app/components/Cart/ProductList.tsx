import { Product, purchaseMachine } from '@/app/machines/purchaseMachine';
import { useMachine } from '@xstate/react';
import React from 'react';

interface Props {
    products: Product[];
}

const ProductList = ({ products }: Props) => {
    return (
        <section className="my-10">
            <h3>Products</h3>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} | Price: {product.price}$ | Requires
                        shipping: {product.isShippingRequired ? 'YES' : 'NO'}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ProductList;
