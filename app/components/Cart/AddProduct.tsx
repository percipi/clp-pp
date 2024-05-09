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

        console.log(nameRef.current!.value);
        console.log(priceRef.current!.value);
        console.log(shippingRef.current!.checked);

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
        <section className="my-10 w-80">
            <h3>Add product</h3>
            <form
                onSubmit={handleSubmit}
                className="form-control"
            >
                <div className="form-control">
                    <label
                        htmlFor="productName"
                        className="label cursor-pointer"
                    >
                        <span className="label-text">Name</span>
                        <input
                            type="text"
                            className="input input-bordered"
                            id="productName"
                            ref={nameRef}
                            minLength={3}
                            maxLength={25}
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
                    className="btn btn-secondary"
                    type="submit"
                >
                    Add
                </button>
            </form>
        </section>
    );
};

export default AddProduct;
