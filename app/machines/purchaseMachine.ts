import { assign, fromPromise, setup } from 'xstate';
import { sendPurchase } from '../components/FinalizingStep/FinalizingStep';

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
    | { type: 'change_street'; value: string }
    | { type: 'change_city'; value: string }
    | { type: 'change_country'; value: string }
    | { type: 'complete' }
    | { type: 'finalize_purchase' };
const purchaseMachine = setup({
    types: {} as {
        context: PurchaseContext;
        events: PurchaseEvents;
    },
    actors: {
        finalizePurchase: fromPromise(
            ({ input }: { input: PurchaseContext }) => {
                return sendPurchase(input);
            }
        ),
    },
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAcCuAnAxgCwIazAFlccBLAOzADpNd0AXAYlwgnTlgG0AGAXURQB7WKXqlB5ASAAeiALQAmAKwKqARiUA2ZQBoQAT0RqFAXxN60WPAWJlKNOkxYQA+snSCIqTPR78kIMjCouKSAbIIACwAnFTc0QoAzAAc0ZpqyYmaStyaeoZRaurciQDs0WmJamVKiUpmFhg4+EQk2BTUtAyMEGAANmD0YG4eXj5+UkEiYhJSEZHcVArJpaXcpalqmsm5pfnySkXRpQoKCxkKapGJ0ZENgU3WrXbUzuywBBCMzeQwLrD0diDCYBKYhWbheSaTSlJZqaJaZLLTQJZJ5AzyNTVKgbFYZLLceFoxL3SzNGxtDpUN4cSDfPC-YaYUT6EFCaahOZQpSxLaRZJI1ZaBL7BByNSLE7ZJTJSJKLTrRKRTSkx4tWztew0j50n5-TCCVDkQGsviTYIzMKgCJyGGROLcNEKUoZbby9EFRQKRaJEry6IChTRdb81VWdWUrWsd6fRiwdrIZAUKBswIWzmQsVBxI47LaJSirYk8wPcMUl7U6O0r7x0iJ5OcNT+dngq0yA6LY553QYhBFsPk56a6i1+u-f79MA+Onarhm0HpiHW+QLZLqLQ9gqnUoDp4aqmjpPjggDac1yc+Ny4fQAWzAxtTYMtXKzmXX+dFQft9RLZL3kZHBMjygf4AGs62QOlH0XNsIiKOoNA-XtEm9XcIwrQ9kzAiCoKbc0OSXds+0OKgUOSYwC2Q1DfzVcthyoZBrzvY1sMTKD5xbZ9MwyJQlhKCjRVqH9GjLIcqUY2973oCdTyGL5Z2ggjYJXGFSIE5C1jQujxKYqSZKnOTvkEG9kAGIZFNbF9FB5UjDg3SiClqHNhNLQd93sA0TLMukADMKFwPpSAAL2GP8Wgsrjl1fWJLniGpRRRFywu0+w-PIALgqw5KwB6CRqAoAA3QRQOobL3OoNKMqCrLaLABBCsEWhLT8CKMyiuQeVhBzEFRHEktq8qqEqwLqvHbLGDAdAPHQBi+lwegfMEdAbwYgaAKG-yRpq0T6vIIqmtCFqOLTJSrO0KhuoQaIUIuswS3ITw4EmNaXnwyzMzkE5VG4R1tBdNFkndUU5F9WEdjqGFDiSbhvTuGjRMGrp6DeyKiOsxZEM3KFki0sSozYasUbatHlE0OINnUgoJVUfqEfWzDjwvOSicIm1lhzBEqixhBt1xwaGZA2BwLYiAWeUrN7TWLnLt5+G3PWiTmOkoWcNFhdTu4m44kB67Sku64ilp+WK0VvSTwMyAxas5Z7Vi3X9aqW65f-CtPNMwZLfV972uWRZHR5eLe20HNlD59bhsysbaqtj6v1s+3RVWVQ9bDisI9GkCfNwUgBjVzjiZtNRYW7eUdlqUpfXWQt1jXI2Xfo7KXHTz389Zg46iWGU-tdQGtGripO5+7RNB+hINjukwgA */
    id: 'purchaseMachine',
    context: {
        products: [],
        address: {
            street: '',
            city: '',
            country: '',
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
            on: {
                finalize_purchase: 'finalizing_purchase',
            },
        },

        finalizing_purchase: {
            invoke: {
                src: 'finalizePurchase',
                input: ({ context }) => context,
                onDone: 'purchase_finalized',
                onError: 'finalizing_failed',
            },
        },
        finalizing_failed: {},
        purchase_finalized: {},
    },
});

export { purchaseMachine };
