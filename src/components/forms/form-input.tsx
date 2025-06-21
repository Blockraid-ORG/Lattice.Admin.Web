'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Textarea } from '../ui/textarea'

type FormInputProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder?: string
  type?: string
} & { isLongText?: boolean }

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  isLongText
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {
              isLongText ? (
                <Textarea
                  rows={5}
                  className={cn(
                    '',
                    fieldState.error ? 'bg-red-200/10 ring-1 ring-red-300' : 'bg-blue-100/30 dark:bg-primary-foreground'
                  )}
                  placeholder={placeholder} {...field}
                />
              ) : (

                <Input
                  className={cn(
                    '',
                    fieldState.error ? 'bg-red-200/10 ring-1 ring-red-300' : 'bg-blue-100/30 dark:bg-primary-foreground'
                  )}
                  placeholder={placeholder} type={type} {...field}
                />
              )
            }
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}