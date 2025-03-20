import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const CheckBoxGroup = forwardRef(function CheckBoxGroup(
    {
        options = [],
        selectedValues = [],
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

    const handleCheckboxChange = (value) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    return (
        <div className={` ${className}`} ref={localRef} {...props}>
            {options.map((option, index) => (
                <label
                    key={index}
                    className="flex items-center justify-between gap-2 rounded border border-zinc-300 px-2 py-1 capitalize shadow"
                >
                    {option.label}
                    <input
                        type="checkbox"
                        value={option.value}
                        checked={selectedValues.includes(option.value)}
                        onChange={() => handleCheckboxChange(option.value)}
                        className="cursor-pointer"
                    />
                </label>
            ))}
        </div>
    );
});

export default CheckBoxGroup;
