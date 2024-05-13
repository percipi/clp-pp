import React, { PropsWithChildren } from 'react';
import NavButton from '../NavButton';
import { STEP_ORDER_NUMBERS } from '@/app/consts';

interface Props {
    currentStep: string;
}

const StepNav = ({ currentStep, children }: PropsWithChildren<Props>) => {
    return (
        <nav className="flex place-content-between px-3 items-center gap-5 max-sm:flex-col">
            <div className="flex gap-5 max-sm:flex-col max-sm:w-full">
                {Object.keys(STEP_ORDER_NUMBERS).map((step) => (
                    <NavButton
                        disabled={
                            STEP_ORDER_NUMBERS[step] >
                            STEP_ORDER_NUMBERS[currentStep]
                        }
                        isCurrent={step === currentStep}
                        key={step}
                        step={step}
                    />
                ))}
            </div>
            {children}
        </nav>
    );
};

export default StepNav;
