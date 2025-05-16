import { ChevronDown } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const SelectInput = forwardRef(function SelectInput(
    { options = [], className = '', isFocused = false, ...props },
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
        <div className="mt-2 flex w-full cursor-pointer items-center rounded-md border border-gray-300 pr-2 shadow-sm">
            <select
                {...props}
                ref={localRef}
                className={`mt-0 cursor-pointer appearance-none rounded-md border-none shadow-none outline-none ${className}`}
            >
                <option value="" disabled>
                    Select an option
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="w-4" />
        </div>
    );
});

export default SelectInput;
