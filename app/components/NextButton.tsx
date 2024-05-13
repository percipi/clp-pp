import React from 'react';

interface Props {
    form?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const NextButton = (props: Props) => {
    return (
        <button
            type="submit"
            className="btn btn-primary max-sm:w-full"
            {...props}
        >
            Next
        </button>
    );
};

export default NextButton;
