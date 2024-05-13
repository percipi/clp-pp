import { Children, PropsWithChildren, ReactNode } from 'react';

interface Props {
    names: string[];
}

const StepBody = ({ children, names }: PropsWithChildren<Props>) => {
    const childrenArray = Children.toArray(children) as ReactNode[];

    return (
        childrenArray && (
            <div className="flex flex-wrap gap-5 justify-between items-start">
                {childrenArray[0] && (
                    <section className="grow p-3 bg-white basis-7/12">
                        <h3 className="mb-5">{names[0]}</h3>
                        {childrenArray[0]}
                    </section>
                )}
                {childrenArray[1] && (
                    <section className="max-lg:grow p-3 bg-white">
                        <h3 className="mb-5">{names[1]}</h3>
                        {childrenArray[1]}
                    </section>
                )}
            </div>
        )
    );
};

export default StepBody;
