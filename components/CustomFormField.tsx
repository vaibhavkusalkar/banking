import React from 'react'
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { FormFieldProps } from '@/types'

const CustomFormField = ({form, name, label, placeholder, type='text', autocomplete, autocapitalize='none', inputmode}: FormFieldProps) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
            <div className='form-item'>
                <FormLabel className='form-label'>
                    {label}
                </FormLabel>
                <div className='flex w-full flex-col'>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            className='input-class'
                            type={type}
                            {...(autocomplete ? {autocomplete} : {})}
                            {...(autocapitalize ? {autocapitalize} : {})}
                            {...(inputmode ? {inputmode} : {})}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className='form-message'/>
                </div>
            </div>
            )}
        />
    )
}

export default CustomFormField