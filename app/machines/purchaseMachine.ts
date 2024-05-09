import { setup } from 'xstate';

const purchaseMachine = setup({
    types: {
        events: {} as
            | { type: 'address' }
            | { type: 'select_shipping' }
            | { type: 'select_payment' }
            | { type: 'skip_payment' }
            | { type: 'complete' },
    },
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoDGAhgE7IDEBEERcsA2gAwC6ioADqrAJbKeoB2LEAA9EANnoBOHACYAzABZZAdgCsAGhABPRNPoBGHKoC+RjWgzYcFarFiRSd7HmQB9WAAtOrVpz5QGzEgg7Fw8-IIiCOJScoqqGtoIABwGKiZm6Fi4Hl4+fm5gTsj2FFQ0AYIh3LwCQZHSijgqEsrqWoiy0tJN6SDmWTg53r5QBUX2jmDOLqwEmgC2YHzIFUFVYbWg9Y3NrQmI8vJSoienZydKvf2WswtLrpPOJZQ2dEyVHNXhdWKSMgp7doIQ6yGRpUx9TI3OaLZZjKbFCCkPCoeasbDFVZsT4bCK-GIA+JAo6g4y9PioCBwQTXMAfUI1PEIAC0on2LNEOHo3O5SlEen5EmkElEVyhuEIJHpX02wgOEno-zibUSum60nBGQsuGsNEg0txPwQShFXNEGvZumOYu1g08w3yj0RBsZRvk0nZCpwrRtA1usIehQR+rWONdWwOXRwegtxJUioF53OlwhtPwqPRYGdoYZ3wjxtN9HNKvl8jBJhMQA */
    id: 'purchaseMachine',
    initial: 'cart',
    states: {
        cart: {
            on: { address: 'adressed' },
        },
        adressed: {
            on: { select_shipping: 'shipping_selected' },
        },
        shipping_selected: {
            on: { address: 'adressed', select_payment: 'payment_selected' },
        },
        payment_selected: {
            on: { address: 'adressed', complete: 'completed' },
        },
        completed: {},
    },
});

export { purchaseMachine };
