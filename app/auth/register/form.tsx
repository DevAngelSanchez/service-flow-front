"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/auth";
import AlertComponent from "@/components/custom/alert"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Username has to be at least 3 characters long",
  }),
  lastname: z.string().min(3, {
    message: "Username has to be at least 3 characters long",
  }),
  username: z.string().min(3, {
    message: "Username has to be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Not valid email",
  }).trim(),
  passwordForm: z.object({
    password: z.string().min(6, {
      message: "Password has to be at least 6 characters long"
    }),
    confirm: z.string(),
  }).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  })
})

export function RegisterForm() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      username: "",
      email: "",
      passwordForm: {}
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true); // Mostrar spinner
      const response = await fetch(`${apiUrl}auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values?.name,
          lastname: values?.lastname,
          username: values?.username,
          email: values?.email,
          password: values?.passwordForm.password
        })
      });
      setIsLoading(false); // ocultar spinner

      const data = await response.json();

      if (data.type !== 'success') {
        resetAlert();
        setAlert({ title: data.title, description: data.msg, type: data.type, show: true });
        setTimeout(() => {
          resetAlert();
        }, 3000);
        return;
      }

      resetAlert();
      setAlert({ title: data.title, description: data.msg, type: data.type, show: true });
      setTimeout(() => {
        resetAlert();
      }, 3000);

      router.push('/auth/login')
    } catch (error) {
      resetAlert();
      setAlert({ title: "Something is wrong!", description: "Try to verify your data", type: "error", show: true });
      setTimeout(() => {
        resetAlert();
      }, 3000);
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[360px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="JohnDoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordForm.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="john.doe$2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordForm.confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="john.doe$2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
          }
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
          ) : (
            'Create User'
          )}
        </Button>
      </form >
      {alert.show && (
        <AlertComponent title={alert.title} msg={alert.description} type={alert.type} show={true} />
      )}
    </Form >
  )
}
