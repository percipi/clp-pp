import { assign, setup } from 'xstate';

export interface Address {
    street: string;
    city: string;
    country: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    isShippingRequired: boolean;
}

export interface PurchaseContext {
    address: Address;
    products: Product[];
}

export type PurchaseEvents =
    | { type: 'address' }
    | { type: 'shipping' }
    | { type: 'select_payment' }
    | { type: 'skip_payment' }
    | { type: 'add_product'; value: Omit<Product, 'id'> }
    | { type: 'delete_product'; value: number }
    | { type: 'complete' };
const purchaseMachine = setup({
    types: {} as {
        context: PurchaseContext;
        events: PurchaseEvents;
    },
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAcCuAnAxgCwIazAFlccBLAOzADpNd0AXAYlwgnTlgG0AGAXURQB7WKXqlB5ASAAeiALQAmAKwKqARiUA2ZQBoQAT0RqFAXxN60WPAWJlKVFmw6RGsbKWTIKUHvyQhkYVFxSX9ZBEUATgBmKgB2TS1dAyNNaLMLDBx8IhJ3e0d2WAIIV3dPb041PyERMQkpcLklbipIhKSlPUMENTSMgKzrXLtqNw8vcigAfQIAGzBMehdCjl8pQLqQxvkAFm4ADnVO7sQFBTiBy2ybPIox8smZ+cXl0pel6eRcfQBbMHI9HW-k2wQaYXkCgOsQ02i6KQQCkiuyoSiuQxytnyDwm3lmAGsJi5gbUwaFQOE1FRokpYcketEFNx0VZMXd7OMKlMCUTSlUagEgvVyTIjLTqVDjPCGUyWTcRtiqN8-gD6DzPMS+BshdsIb0DkoqEzolLTgglDS5cMsfclT9-oDZmAFksVqwilwtSCdeCKXtNHFqaaEdE4szzINWbdRnaVY6Pm9GJhBL9kAtliTBVtfaKIspItTaScERbYmiI9drezqLQGMxWAAFdCCCCoJaZ0HCnYRXZqVp06XyTSaeK7SLjpQHNRj2m7MwR8gtuAbDHR7Ha7MippFoP0+QaQ1j8dxaKRNQm3YHbiXCurhW22v0Ddk7uKFrHOFmuSaA5Wtkx1ZikgZ8uz1N8R2vKc916bhVHLTIo3vDlHjxBNgO9TdXyhWJIgtYMenOG8EPlG1kNxblYEJDUIBA3U-TzFEwxNaDCL-NdbWVB01Uo3laJzSlTyoQ4lBiOJBwQXYTVRNikOoTjVSdF03j4rdIQOFEFD7UTxMkql4MjEjqxoFM0zAZSMJfMCoVaYTtLNbRYmUecTCAA */
    id: 'purchaseMachine',
    context: {
        products: [],
        address: {
            street: 'ul. Krakowska 45/5',
            city: 'Poznań',
            country: 'Polska',
        },
    } as PurchaseContext,
    initial: 'cart',
    states: {
        cart: {
            on: {
                address: 'addressed',
                add_product: {
                    actions: assign({
                        products: ({ event, context }) => {
                            return [
                                ...context.products,
                                {
                                    id:
                                        context.products[
                                            context.products.length - 1
                                        ]?.id + 1 || 0,
                                    ...event.value,
                                },
                            ];
                        },
                    }),
                },
                delete_product: {
                    actions: assign({
                        products: ({ event, context }) => {
                            return context.products.filter(
                                (product) => product.id !== event.value
                            );
                        },
                    }),
                },
            },
        },

        addressed: {
            on: {
                shipping: [
                    {
                        guard: ({ context }) =>
                            context.products.some(
                                (product) => product.isShippingRequired
                            ),
                        target: 'shipping_selected',
                    },
                    {
                        target: 'shipping_skipped',
                    },
                ],
            },
        },

        shipping_selected: {
            on: { address: 'addressed', select_payment: 'payment_selected' },
        },

        shipping_skipped: {
            always: [
                {
                    guard: ({ context }) =>
                        context.products.some((product) => product.price > 0),
                    target: 'payment_selected',
                },
                { target: 'payment_skipped' },
            ],
        },

        payment_skipped: {
            always: {
                target: 'completed',
            },
        },

        payment_selected: {
            on: { address: 'addressed', complete: 'completed' },
        },

        completed: {
            type: 'final',
        },
    },
});

export { purchaseMachine };
