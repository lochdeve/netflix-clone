'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@/actions/login';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { FormError } from './FormError';
import { formSchema } from './LoginForm.form';

export function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = await login(values);
      setError(data?.error);
      if (data?.success) {
        toast.success('Login se ha realizado con éxito');
        router.push('/profiles');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full gap-4 flex flex-col'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Correo electrónico'
                  {...field}
                  className='h-14 text-white'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Contraseña'
                  {...field}
                  type='password'
                  className='h-14 text-white'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />

        <Button type='submit' className='w-full bg-[#E50914]'>
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
}
