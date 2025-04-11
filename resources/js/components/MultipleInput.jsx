import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

export default forwardRef(function MultipleInput(
    {
        type = 'text',
        icon,
        className = '',
        isFocused = false,
        value = [], // Default value is an empty array
        onChange,
        ...props
    },
    ref,
) {
    const localRef = useRef(null);
    const [inputs, setInputs] = useState(value.length > 0 ? value : ['']); // Set default to one input if value is empty

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused && localRef.current) {
            localRef.current.focus();
        }
    }, [isFocused]);

    const handleChange = (e, index) => {
        const newInputs = [...inputs];
        newInputs[index] = e.target.value;
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
                <div key={index} className="flex items-center space-x-2">
                    <input
                        {...props}
                        type={type}
                        className={
                            'mt-1 block w-full rounded-md border border-gray-300 px-2 py-2 text-sm shadow shadow-sm focus:border-indigo-500 focus:ring-indigo-500' +
                            className
                        }
                        ref={index === 0 ? localRef : null}
                        value={inputValue}
                        onChange={(e) => handleChange(e, index)}
                    />
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
