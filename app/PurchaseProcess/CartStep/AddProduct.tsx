'use client';
import { PurchaseEvents } from '@/app/machines/purchaseMachine';
import React, { FormEvent, useRef } from 'react';

interface Props {
    send: (event: PurchaseEvents) => void;
}

const AddProduct = ({ send }: Props) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const shippingRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        send({
            type: 'add_product',
            value: {
                name: nameRef.current!.value,
                price: parseInt(priceRef.current!.value),
                isShippingRequired: shippingRef.current!.checked,
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="form-control max-w-96"
        >
            <div className="form-control">
                <label
                    htmlFor="productName"
                    className="label cursor-pointer"
                >
                    <div className="label-text mr-5">Name</div>
                    <input
                        type="text"
                        className="input input-bordered"
                        id="productName"
                        ref={nameRef}
                        minLength={1}
                        maxLength={20}
                        required
                    />
                </label>
            </div>
            <label
                htmlFor="productPrice"
                className="label cursor-pointer"
            >
                <span className="label-text">Price</span>
                <input
                    type="number"
                    min="0"
                    max="1000000"
                    className="input input-bordered"
                    id="productPrice"
                    ref={priceRef}
                    required
                />
            </label>
            <label
                htmlFor="productShipping"
                className="label cursor-pointer"
            >
                <span className="label-text">Requires shipping</span>
                <input
                    type="checkbox"
                    className="toggle toggle-secondary"
                    ref={shippingRef}
                />
            </label>
            <button
                className="btn btn-secondary mt-3"
                type="submit"
            >
                Add
            </button>
        </form>
    );
};

export default AddProduct;
