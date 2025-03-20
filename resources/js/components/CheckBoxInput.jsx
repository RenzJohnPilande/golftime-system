import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const CheckBoxInput = forwardRef(function CheckBoxInput(
    {
        label = '',
        checked = false,
        onChange,
        className = '',
        isFocused = false,
        ...props
    },
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

    return (
        <label
            className={`flex cursor-pointer items-center gap-2 rounded border border-zinc-300 px-2 py-1 shadow ${className}`}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="cursor-pointer"
                ref={localRef}
                {...props}
            />
            <span className="capitalize">{label}</span>
        </label>
    );
});

export default CheckBoxInput;
