import { Input } from '@/components/ui/input'; // Assuming the Input component is being used
import { Label } from '@/components/ui/label'; // Assuming the Label component is being used
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function FileInput(
    {
        className = '',
        label = '',
        id,
        name,
        multiple = false,
        accept = 'image/*',
        error = null,
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
        <div className="grid w-full content-center items-center gap-1.5">
            {label && <Label htmlFor={id}>{label}</Label>}
            <Input
                {...props}
                ref={localRef}
                type="file"
                name={name}
                id={id}
                multiple={multiple}
                accept={accept}
                className={
                    'block h-min w-full cursor-pointer rounded-md border-gray-300 py-2 shadow-sm outline-none ' +
                    (error ? 'border-red-500' : '') +
                    ' ' +
                    className
                }
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
});
