'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { dataProfilesImages } from './FormAddProfile.data';
import { formSchema } from './FormAddProfile.form';
import { FormAddProfileProps } from './FormAddProfile.types';

export function FormAddProfile(props: FormAddProfileProps) {
  const { setOpen } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileName: '',
      avatarUrl: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/userNetflix', values);
      if (response.status !== 200) {
        toast.error('Ops! Ha ocurrido un error');
      } else {
        toast.success('¡Usuario creado correctamente!');
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Ops! Ha ocurrido un error');
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='profileName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de perfil</FormLabel>
              <FormControl>
                <Input placeholder='Juan' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='avatarUrl'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Selecciona tu imagen de perfil</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex space-y-1 gap-13'
                >
                  {dataProfilesImages.map((data) => (
                    <FormItem
                      key={data.urlImage}
                      className='flex flex-col-reverse justify-center items-center space-x-5 space-y-0 cursor-pointer'
                    >
                      <FormControl className='text-white ml-3 mt-1'>
                        <RadioGroupItem value={data.urlImage} />
                      </FormControl>
                      <FormLabel className='font-normal flex justify-center w-full'>
                        <Image
                          src={data.urlImage}
                          alt='Profile'
                          width={50}
                          height={50}
                          className={
                            field.value === data.urlImage
                              ? 'cursor-pointer border-white border'
                              : ''
                          }
                        />
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='bg-neutral-700 rounded-md cursor-pointer'
          type='submit'
          disabled={isLoading}
        >
          Crear usuario
        </Button>
      </form>
    </Form>
  );
}
