import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    if (type === 'textarea') {
        return (
            <textarea
                {...props}
                className={
                    'min-h-[80px] rounded-md border-gray-300 shadow-sm outline-none ' +
                    className
                }
                ref={localRef}
            />
        );
    }

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-gray-300 shadow-sm outline-none ' + className
            }
            ref={localRef}
        />
    );
});
