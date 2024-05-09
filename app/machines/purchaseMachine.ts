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

interface PurchaseContext {
    address: Address;
    products: Product[];
}

export type PurchaseEvents =
    | { type: 'address' }
    | { type: 'shipping' }
    | { type: 'select_payment' }
    | { type: 'skip_payment' }
    | { type: 'complete' };
const purchaseMachine = setup({
    types: {} as {
        context: PurchaseContext;
        events: PurchaseEvents;
    },
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAcCuAnAxgCwIazAFlccBLAOzADpNd0AXAYlwgnTlgG0AGAXURQB7WKXqlB5ASAAeiALQAmAKwKqARiUA2ZQBoQAT0RqFAXxN60WPAWJlKVFmw6RGsbKWTIKUHvyQhkYVFxSX9ZBEUATgBmKgB2TS1dAyNNaLMLDBx8IhJ3e0d2WAIIV3dPb041PyERMQkpcLklbipIhKSlPUMENTSMgKzrXLtqNw8vcigAfQIAGzBMehdCjl8pQLqQxvkAFm4ADnVO7sQFBTiBy2ybPIox8smZ+cXl0pel6eRcfQBbMHI9HW-k2wQaYXkCgOsQ02i6KQQCkiuyoSiuQxytnyDwm3lmAGsJi5gbUwaFQOE1FRokpYcketEFNx0VZMXd7OMKlMCUTSlUagEgvVyTIjLTqVDjPCGUyWTcRtiqN8-gD6DzPMS+BshdsIb0DkoqEzolLTgglDS5cMsfclT9-oDZmAFksVqwilwtSCdeCKXtNHFqaaEdE4szzINWbdRnaVY6Pm9GJhBL9kAtliTBVtfaKIspItTaScERbYmiBuRBBA4BsMdHsdrsyKmkWg-T5BpDeXMlGFbbaAxG2SdnmWsc4Wa5JoDla2THVsVIEPhSPFFoqNw4gdgz01NxVN3I-KbRzHniE0vvU3V1DYpELTuzhdZ-XbZynurkJfSSu9YoUWGJrtoiz4Rtc1rstQyoOmqsCEhqEDLrqfq9NEBaHEoMRxNKiC7CaqIvn29jQaqToum8SE5k0UIogoe5YThCB4VSh7gXOirJqm6bflmw5-lCrQYQxZraLEyhmGYQA */
    id: 'purchaseMachine',
    context: {
        products: [
            {
                id: 0,
                name: 'wiadro',
                price: 10,
                isShippingRequired: true,
            },
            {
                id: 1,
                name: 'Emi - audiobook',
                price: 0,
                isShippingRequired: false,
            },
        ],
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
