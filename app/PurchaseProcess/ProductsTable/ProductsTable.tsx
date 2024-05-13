import { Product } from '@/app/machines/purchaseMachine';
import React from 'react';
import DeleteIcon from './DeleteIcon';

interface Props {
    products: Product[];
    onDelete?: (productId: number) => void;
}

const ProductsTable = ({ products, onDelete }: Props) => {
    return (
        <table className="table table-zebra table-pin-rows">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Shipping required</th>
                    {onDelete && <th>Remove</th>}
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.isShippingRequired ? 'YES' : 'NO'}</td>
                        {onDelete && (
                            <td>
                                <button
                                    onClick={() => onDelete(product.id)}
                                    className="btn btn-xs btn-circle btn-ghost"
                                >
                                    <DeleteIcon />
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
