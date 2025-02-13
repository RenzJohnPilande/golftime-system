import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const TextAreaForm = ({
    form,
    attr = {
        type: 'text',
    },
    styles,
}) => (
    <FormField
        control={form.control}
        name={attr.name}
        render={({ field }) => (
            <FormItem className={cn('', styles?.wrapper)}>
                <FormLabel>{attr?.label}</FormLabel>
                <FormControl>
                    <Textarea
                        rows={attr?.rows}
                        placeholder={attr?.placeholder}
                        className={styles?.textarea}
                        {...field}
                    />
                </FormControl>
                <FormDescription>{attr?.desc}</FormDescription>
                <FormMessage
                    className={cn('h-[1rem] text-xs', styles?.message)}
                >
                    {attr?.message}
                </FormMessage>
            </FormItem>
        )}
    />
);

TextAreaForm.displayName = 'TextAreaForm';

export default TextAreaForm;
