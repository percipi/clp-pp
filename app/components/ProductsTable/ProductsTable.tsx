import { Product } from '@/app/machines/purchaseMachine';
import React from 'react';

interface Props {
    products: Product[];
    onDelete?: (productId: number) => void;
}

const ProductsTable = ({ products, onDelete }: Props) => {
    return (
        <table className="table table-zebra table-pin-rows">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Shipping required</th>
                    {onDelete && <th>Remove</th>}
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.isShippingRequired ? 'YES' : 'NO'}</td>
                        {onDelete && (
                            <td>
                                <button
                                    onClick={() => onDelete(product.id)}
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
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;
