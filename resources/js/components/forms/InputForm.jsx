import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/';

const InputForm = ({
    form,
    attr = {
        type: 'text',
    },
    styles,
    onChange,
}) => {
    return (
        <FormField
            control={form.control}
            name={attr.name}
            render={({ field }) => (
                <FormItem className={cn('space-y-1', styles?.wrapper)}>
                    <FormLabel className={cn('', styles?.label)}>
                        {attr?.label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            required={attr?.required}
                            type={attr?.type}
                            disabled={attr?.disabled}
                            placeholder={attr?.placeholder}
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                if (onChange) onChange(e);
                            }}
                            className={cn('', styles?.input)}
                        />
                    </FormControl>
                    <FormDescription>{attr?.desc}</FormDescription>
                    <FormMessage className="h-[1rem] text-xs">
                        {attr?.message}
                    </FormMessage>
                </FormItem>
            )}
        />
    );
};

InputForm.displayName = 'InputForm';

export default InputForm;
