import React, { ReactNode } from 'react';

interface Props {
    name: string;
    children: ReactNode;
}

const StepNav = ({ name, children }: Props) => {
    return (
        <nav className="flex place-content-between px-3 items-center">
            <h2 className="m-0">{name}</h2>
            {children}
        </nav>
    );
};

export default StepNav;
