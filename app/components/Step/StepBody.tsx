import { Children, PropsWithChildren, ReactNode } from 'react';

interface Props {
    names: string[];
}

const StepBody = ({ children, names }: PropsWithChildren<Props>) => {
    const childrenArray = Children.toArray(children) as ReactNode[];

    return (
        childrenArray && (
            <div className="flex gap-5 items-start justify-between">
                {childrenArray[0] && (
                    <section className="grow p-3 bg-white">
                        <h3>{names[0]}</h3>
                        {childrenArray[0]}
                    </section>
                )}
                {childrenArray[1] && (
                    <section className="p-3 bg-white">
                        <h3>{names[1]}</h3>
                        {childrenArray[1]}
                    </section>
                )}
            </div>
        )
    );
};

export default StepBody;
