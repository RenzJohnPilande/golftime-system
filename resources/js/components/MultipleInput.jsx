import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import SelectInput from './SelectInput';

export default forwardRef(function MultipleInput(
    {
        inputType = 'text',
        selectOptions = [],
        icon,
        className = '',
        isFocused = false,
        value = [],
        onChange,
        ...props
    },
    ref,
) {
    const localRef = useRef(null);
    const [inputs, setInputs] = useState(value.length > 0 ? value : ['']);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused && localRef.current) {
            localRef.current.focus();
        }
    }, [isFocused]);

    const handleChange = (val, index) => {
        const newInputs = [...inputs];
        newInputs[index] = val;
        setInputs(newInputs);

        if (onChange) {
            onChange(newInputs);
        }
    };

    const addInput = () => {
        setInputs([...inputs, '']);
    };

    const removeInput = (index) => {
        const newInputs = inputs.filter((_, i) => i !== index);
        setInputs(newInputs);
        if (onChange) {
            onChange(newInputs);
        }
    };

    return (
        <div className="space-y-2">
            {inputs.map((inputValue, index) => (
                <div key={index} className="flex w-full gap-2">
                    {inputType === 'select' ? (
                        <SelectInput
                            options={selectOptions}
                            className={` ${className}`}
                            value={inputValue}
                            onChange={(e) =>
                                handleChange(e.target.value, index)
                            }
                            ref={index === 0 ? localRef : null}
                        />
                    ) : (
                        <input
                            {...props}
                            type={inputType}
                            className={`mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 text-sm shadow shadow-sm outline-none ${className}`}
                            ref={index === 0 ? localRef : null}
                            value={inputValue}
                            onChange={(e) =>
                                handleChange(e.target.value, index)
                            }
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => removeInput(index)}
                        className="text-red-500"
                    >
                        {icon}
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addInput}
                className="rounded border bg-zinc-800 px-4 py-2 text-xs text-white"
            >
                Add Input
            </button>
        </div>
    );
});
