import { PurchaseMachineContext } from '@/app/page';
import React from 'react';
import ProductsTable from '../ProductsTable';

const ProductList = () => {
    const products = PurchaseMachineContext.useSelector(
        (state) => state.context.products
    );
    const { send } = PurchaseMachineContext.useActorRef();

    return (
        <>
            {products.length > 0 ? (
                <div
                    className="overflow-x-auto"
                    style={{ scrollbarGutter: 'stable' }}
                >
                    <ProductsTable
                        onDelete={(productId) =>
                            send({
                                type: 'delete_product',
                                value: productId,
                            })
                        }
                        products={products}
                    />
                </div>
            ) : (
                <span>Cart is empty</span>
            )}
        </>
    );
};

export default ProductList;
