import { assign, fromPromise, setup } from 'xstate';

// https://public.requestbin.com/r/enb7fze0kvb8w
async function sendPurchase(purchase: PurchaseContext): Promise<Response> {
    return fetch('https://enb7fze0kvb8w.x.pipedream.net', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchase),
    });
}

export const enum PurchaseStates {
    cart = 'cart',
    address = 'address',
}

export const STEPS = {
    cart: 'cart',
    address: 'address',
    shipping: 'shipping',
    payment: 'payment',
    summary: 'summary',
};

export const STEP_ORDER_NUMBERS: { [key: string]: number } = {
    [STEPS.cart]: 0,
    [STEPS.address]: 1,
    [STEPS.shipping]: 2,
    [STEPS.payment]: 3,
    [STEPS.summary]: 4,
};

export enum COUNTRIES {
    POLAND = 'Poland',
    USA = 'USA',
}

export enum SHIPPING {
    POLISH_EXPRESS = 'Polish Express',
    WORLDWIDE_DELIVERY = 'Worldwide Delivery',
}

export enum PAYMENTS {
    PAYPAL = 'PayPal',
    BANK_TRANSACTION = 'Bank Transaction',
    PAY_ANYWHERE = 'Pay Anywhere',
}

export interface Address {
    street: string;
    city: string;
    country: COUNTRIES | '';
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
    shipping: '' | SHIPPING;
    payment: '' | PAYMENTS;
}

export type PurchaseEvents =
    | { type: 'cart' }
    | { type: 'address' }
    | { type: 'shipping' }
    | { type: 'payment' }
    | { type: 'add_product'; value: Omit<Product, 'id'> }
    | { type: 'delete_product'; value: number }
    | { type: 'change_street'; value: string }
    | { type: 'change_city'; value: string }
    | { type: 'change_country'; value: COUNTRIES }
    | { type: 'change_shipping'; value: SHIPPING }
    | { type: 'change_payment'; value: PAYMENTS }
    | { type: 'summary' }
    | { type: 'complete' };
const purchaseMachine = setup({
    types: {} as {
        context: PurchaseContext;
        events: PurchaseEvents;
    },
    actors: {
        complete: fromPromise(({ input }: { input: PurchaseContext }) => {
            return sendPurchase(input);
        }),
    },
    guards: {
        isProductWithShippingRequiredInCart: ({ context }) =>
            context.products.some((product) => product.isShippingRequired),
        isPayableProductInCart: ({ context }) =>
            context.products.some((product) => product.price > 0),
    },
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAcCuAnAxgCwIazAFlccBLAOzADpNd0AXAYlwgnTlgG0AGAXURQB7WKXqlB5ASAAeiALQAmAKwKqARiUA2ZQBoQAT0RqFAXxN60WPAWJlKNOkxYQA+snSCIqTPR78kIMjCouKSAbIIACwAnFTc0QoAzAAc0ZpqyYmaStyaeoZRaurciQDs0WmJamVKiUpmFhg4+EQk2BTUtAyMEGAANmD0YG4eXj5+UkEiYhJSEWrc3FQKyaWl3KWpaprJuaX58grKVNGlR5HcGQpqkYnRiQ2BTdatdtTO7LAEEIzN5DAuWD0diDCYBKYhWbheSaTSlZZqaJaZIrTQJZJ5AzyNTVKibVYZLKXaIYh7mJ5WFq2dr2D4cSC-PD-YaYUT6MFCaahOYwpSxbaRZIotZaBIHBByBZ4hTZJTJSJKLQbRKRTSPSzNGxtDpUOlfBl-AGYQSocjA9l8SbBGZhUARORwyJxbgYhSlDI7RWYgqKBRLRIlRUklHRDaC9XPKna2msT7fRiwdrIZAUKAcwLW7nQiUXJRURLKVYXP2aBWrcXbMmNSlat662P0n6J0jJ1OcNT+TmQ20yRBZKgxUpVcrrdaZSIVzRVima1406jN1v-QH9MA+Bl6riW8GZqF2+QxJ0abRKcVHUoRmtznWLlPLggDddN1c+Ny4fQAWzAZvTEJtPIlO54QWDQ+UybgVGiNRxQDWIhwFI5FgWF1L1nakbyTO8oBXR8hmfXC30-b9fA7K0uT3XsEGUCcsQQWC8SqUtEMuRZklQl50PsW9U0BABrFtkA3Bsvl-Xce3tbJkjPHZ2KjOtuPvfjkwZZB3y-H9ty7f9s0leJ1E0FiFFuXMlDWGDSjzd0Ugue45URDFZNrecqAU7DYCUwSflUoif1IndyPExBIlVczLOqXZrgqCzcjVckNQ46NqG89T6D4gShLYDhRICgC5CHbhxVVJZ0gxOVlBKTZHOvexkuItLlJ+Y0P2QAYhmy7sAJC2i5Tzeo4sjJydVqs0cLXPDmGErdOwzHKdL5RJ82MU9aKyWLqzQxKqGG1KHzGg1BGa1qwHa7T9wlN14TqY9dG6xIFr69aErrJqWsGBkADMKFwPpSAAL2GeKWhOrMzsUVIEXiGpxTRB6Zye5zPvIb6-p4wGCB6CRqAoAA3QReKSgbquoRHkd+1HCYQHHBFoG0-GBij7T5eFloKdE8VhtGiaoEmfrJ5dOcYMB0A8dAtr6XB6HewR0A-LbCc44mvt58mr0p8hcZp0I6c0maOp07QqBZxB7lUPryXITw4EmeXErIvXQbWKTaLkKoFsiM4jMuFEbjuadOYVhwGDt07KMUHJ1C0G6fRk-qrwDzdIGDkHQ+UTQ4k2JaK24U2qoD1zRqfJOGcOcGdmiv0znmqPEHPXPNvz9z0ogIvAoQM48QyCy+W2D2sjPFRnQyKDbjqJQ1Asuu622+rPJbgCjOWUp0lHhCAxogoiqoErJPKso2Njjap7UurdsL-z7ZT+UIfuCzCqqQ3J+cl6jub8+Q-tFYlhdebb9o7QFuUI-HUPMUb80JnPHSChohOjqDfI2bd24TwPvDYBStQHYXergUgAxX5aWTvaceW9I6Kl2LUfKGws6bAfsguSzlOYuBAf9XBut37yFqHmQs2h3QYmSF6LOFRlg5FyDKRYCRKpmBMEAA */
    id: 'purchaseMachine',
    context: {
        products: [],
        address: {
            street: '',
            city: '',
            country: '',
        },
        shipping: '',
        payment: '',
    } as PurchaseContext,
    initial: PurchaseStates.cart,
    states: {
        [PurchaseStates.cart]: {
            on: {
                address: PurchaseStates.address,
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

        [PurchaseStates.address]: {
            on: {
                cart: PurchaseStates.cart,
                change_street: {
                    actions: assign({
                        address: ({ event, context }) => {
                            return { ...context.address, street: event.value };
                        },
                    }),
                },
                change_city: {
                    actions: assign({
                        address: ({ event, context }) => {
                            return { ...context.address, city: event.value };
                        },
                    }),
                },
                change_country: {
                    actions: assign({
                        address: ({ event, context }) => {
                            return { ...context.address, country: event.value };
                        },
                    }),
                },
                shipping: [
                    {
                        guard: 'isProductWithShippingRequiredInCart',
                        target: 'shipping_selected',
                    },
                    {
                        target: 'shipping_skipped',
                    },
                ],
            },
        },

        shipping_selected: {
            tags: ['shipping'],
            on: {
                cart: PurchaseStates.cart,
                address: PurchaseStates.address,
                payment: [
                    {
                        guard: 'isPayableProductInCart',
                        target: 'payment_selected',
                    },
                    { target: 'payment_skipped' },
                ],
                change_shipping: {
                    actions: assign({
                        shipping: ({ event }) => {
                            return event.value;
                        },
                    }),
                },
            },
        },

        shipping_skipped: {
            tags: ['shipping'],
            on: {
                cart: PurchaseStates.cart,
                address: PurchaseStates.address,
                payment: [
                    {
                        guard: 'isPayableProductInCart',
                        target: 'payment_selected',
                    },
                    { target: 'payment_skipped' },
                ],
            },
        },

        payment_skipped: {
            tags: ['payment'],
            on: {
                cart: PurchaseStates.cart,
                address: PurchaseStates.address,
                summary: 'summary',
                shipping: [
                    {
                        guard: 'isProductWithShippingRequiredInCart',
                        target: 'shipping_selected',
                    },
                    {
                        target: 'shipping_skipped',
                    },
                ],
            },
        },

        payment_selected: {
            tags: ['payment'],
            on: {
                cart: PurchaseStates.cart,
                address: PurchaseStates.address,
                summary: 'summary',
                change_payment: {
                    actions: assign({
                        payment: ({ event }) => {
                            return event.value;
                        },
                    }),
                },
                shipping: [
                    {
                        guard: 'isProductWithShippingRequiredInCart',
                        target: 'shipping_selected',
                    },
                    {
                        target: 'shipping_skipped',
                    },
                ],
            },
        },

        summary: {
            on: {
                cart: PurchaseStates.cart,
                address: PurchaseStates.address,
                shipping: [
                    {
                        guard: 'isProductWithShippingRequiredInCart',
                        target: 'shipping_selected',
                    },
                    {
                        target: 'shipping_skipped',
                    },
                ],
                payment: [
                    {
                        guard: 'isPayableProductInCart',
                        target: 'payment_selected',
                    },
                    { target: 'payment_skipped' },
                ],
                complete: 'completing',
            },
        },

        completing: {
            tags: ['final'],
            invoke: {
                src: 'complete',
                input: ({ context }) => context,
                onDone: 'completed',
                onError: 'error_on_completing',
            },
        },
        completed: { tags: ['final'] },
        error_on_completing: {
            tags: ['final'],
            on: {
                complete: 'completing',
            },
        },
    },
});

export { purchaseMachine };
