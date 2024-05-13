import { assign, fromPromise, setup } from 'xstate';
import { COUNTRIES, SHIPPING, PAYMENTS } from '../consts';

// https://public.requestbin.com/r/enb7fze0kvb8w
async function sendPurchase(purchase: PurchaseContext): Promise<Response> {
    return fetch('https://enb7fze0kvb8w.x.pipedream.net', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchase),
    });
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
    /** @xstate-layout N4IgpgJg5mDOIC5QAcCuAnAxgCwIazAFlccBLAOzADpNd0AXAYlwgnTlgG0AGAXURQB7WKXqlB5ASAAeiAIwAOAMxKqANm4BOACybNAVn1zF+pQBoQAT0Sa1AJnUL93Jd2e7uAdk8BfHxbQsPAJiMkoaOiYWCAB9ZHRBCFRMeh5+JBBkYVFxSQzZBDk1T20qbjslfV1nNSVtNU0LawRNLyo5bQV7AyrtPrk-AIwcfCISbApqWgZGCDAAGzB6MDiEpJS0qSyRMQkpAqK1fSo7RQU7BU8VbQq7JsQFY3ae7hubpU1FQczh4LGw6jRdiwWCMaapPhbbK7PKgAqnOTcMrcbgdFRyTyIwz3Qqo1QmbgaFH6S5Fb6BEYhcaTKhAjhgvDkGAxWD0dhLTYZbY5Pb5RB2OwNKieBSaOyvBTnKrKHFdBwfLSaEo3UWfcm-UahCbhOkghm4JkrTCiSycoQ7XL7fl2bxUBTaJSixT2TpKnGeNRqKgOkWeU6ue3FdVBTXUnWsYGgkaGmKYQSochs02QrnQy18hAC2rI1GdTEoxQ44pIzraEpqR6XHTaYOU-7awER+mwCbIZAUKBmzJp3lw+TKVQaHR6QzGJzmKzyG5esVKC4ebRFNX+H4hqkA2lNvUt0htjucOTpc082EyeSae3qOxGG0CzSufSeHHvb2HRcqP2tXwril-LU0nc9yZFkFjAFJIDBSIu25GErUKUwHFOSUKjqNxEUaSdcVeb0dA0RF0UefRaz-MNqEA9tgIIRZwIgZgty4FNj1gjM5AQk4zhQ7Q0K0HF9B0dRPU9LxDDUMs7GI0MN3IjsQOo5ZaOQXBLAAWzARNoJ7U8CgvJEFSuYxym0EkcSxQd9NaC8jj6BQJPXBsqGkyjQJoxhFJUtTUkPKELV7M9cRJb0lA9V4OlqTpZSqKglG6EVigxe81Fs+sANbCioFksD5P1GNHM7Rjux8rT5CUVi7VcIo5BtUVKgnZpWi9KoOklOQguKIKkv-cJcpZABrXdkAg8ENMKuDWLndjkOubiMOaUTjkOUS3FaB0bQ60iHNSmTYD6tsIN1BijwKk9RrYpDzimoweMw3p2kEhQtHFLoyR-DU7JS-qtp2gaFKU1T1PymD0z7Fp7qir9CUFBLJXdSoTk+PpHTlG1Epetdkq6zbKK+iC3L+zzDsB3yDjcBRAuCxd6jqBReOUYVPg0IKOgFbw1o3XGPN6-rBqggHNLg0UZ1OVpCQMVoSvdJw6Y6K5HUxT5vyGNHOuodnE053baP24bjozAWqDFORhYaPiXDkHFXAcQT7COLp7q6FHFbrZWqFV+h1e+xhYFQZTlLoZMCb5jMbzBtw+IvG5ellPphWKK5qiuOxF1Z+zXfdiDcu15jgb1g2jdF02cWWu1ugHD5PXtZOaVT7audojOvNTEbddsfWhZRY2xbNzCwrhooVFOIx5cr8Jq+crKht5pvs5b3P2-z8XMMqgx2gT8U82cSVh5V36OaozK9vozOgb8nO25Fk2F+aViy3UVejEMR1Ki3l2d7VveXK9n2-aPonEGDhUjj3kOMYO4mE9BehaiUfQSERQVAGKjJ261R5yUGoyZkrsf5FQQKJL0AC1BnB0CiUBdVOiOD6ISV4dhPhzmfsg-eddMZ5QDlPE+M8z4dwLovFE+J9L4M6IYe6mhaGvzdu-LK9dmE62noLQ2c8L5d1mpeTw9MWqvD0N4JQz9P6+3QJYSCDBMFwQqKTD0+gjjOhag6IKJlFzHFnBUaBQU9CEi0d7HReitaTykX5YxMczFGCenUD8Jly7ejga0CothLiuK-roz2jDDEZl8aY8xgSrFPkXhiUo7xxSPiCuUCsMT3HxI+kyA8kis4+MdH41J+CgnWMwpTMoi4KznFsIiRORS-auREYk4GySji1MscErh9R1BBU6EUSUvp4GOxIlJNx3SMENyYsfeE1SUkBLqek2Uy9BTeGlgbLQNkEHzPsto7pcZlLIEWMsPpVSTGDK2cMhpV8NBS26KJFQhgxTPyuTcpYHZZgSGoBQAAboIHqKtXroymIIa5tyOwIHBYIWgMI0j3IKKfWR59O4mUvPTYoOgBRUMqicuZkl7L-MRUyRgYB0AJHQC7eYuB6AADNBDoGUi7GFztqWAqZMi8gEK0W5AxV4ypWK2E4o4ZfYqDgUTcJFK1T0ZZn70sZTECQsZ4UArELS-ldyJVrPkEUTw+tCSVHwYiZRIpZRyCoM4RVA5iyJ3Et8cgiQ4BbF5aRby3iCgAFo1A4kDXYvQ4CGieGJCSIipzKU0nBP6yV8gKyaH1h0VitRPQGFFCZFEpNEQYmlKq2wcaKVvXDGwDgyaTWZlJScR8thZwVmKIXbMdRFzMyqAYViWjGEZRorW3+hQSqqGvOKW83ApR8XzW0XQ9RLG6D9Pg-tpT0o1w1sOrBLVSqvF0PLVpHpqbdzqB86djpTgFOEe5N+2MIDbrgqJc14dZZlkqjm3ZSJFA+isobXQ7qK2wpfre0RY9ICPozKJUoHx7QeiVKWIo+bdDjM8KYFqPbBldN0ZB4GNwQnQMdXAkUDp7yonLauRBG5DUdlw35L57QzHI0UNGroM1irmuUaxe6xQH73j+bq25EHG4BuKtOu0FxDbKKMlxeo+LVD00xMYVtygHaUbOTSDVnKtXkB1QigVUA6MHADBJx4SodBVFeCGxe15Xzl0OAcgwKM-BAA */
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
    initial: 'cart',
    states: {
        cart: {
            on: {
                address: 'address',
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

        address: {
            on: {
                cart: 'cart',
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
                cart: 'cart',
                address: 'address',
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
                cart: 'cart',
                address: 'address',
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
                cart: 'cart',
                address: 'address',
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
                cart: 'cart',
                address: 'address',
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
                cart: 'cart',
                address: 'address',
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
        completed: {
            tags: ['final'],
            type: 'final',
        },
        error_on_completing: {
            tags: ['final'],

            on: {
                complete: 'completing',
            },

            type: 'final',
        },
    },
});

export { purchaseMachine };
