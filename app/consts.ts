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
