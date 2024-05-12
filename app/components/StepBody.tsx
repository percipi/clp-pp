import React, { PropsWithChildren } from 'react';

const StepBody = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex gap-5 items-start justify-between">{children}</div>
    );
};

export default StepBody;
