"use client"

import React, { useState, useEffect, FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/auth.config";
import { IconEdit } from "@tabler/icons-react";
import { Property } from "@/lib/types";
import { EditProperty } from "./actions";
import AlertComponent from "@/components/custom/alert";

interface EditPropertyFormProps {
  property: Property;
}

interface Customer {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  role: string;
  isActive: string;
}

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(3, {
    message: "The property name must have more than 3 characters"
  }).trim(),
  address: z.string().min(3, {
    message: "The property address must have more than 3 characters"
  }).trim(),
  city: z.string().min(2, {
    message: "The property city field must be more than 2 characters"
  }),
  state: z.string().min(2, {
    message: "The property state field must be more than 2 characters"
  }),
  zipPostalCode: z.string().min(2, {
    message: "The property postal code field must be more than 2 characters"
  }),
  ownerId: z.string({
    message: ""
  })
});

export const EditPropertyForm: FC<EditPropertyFormProps> = ({ property }) => {
  const router = useRouter();

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`${apiUrl}api/users/by-role/CUSTOMER`);
      if (!response.ok) {
        resetAlert();
        setAlert({ title: "Erro!", description: "Users not found", type: response.type, show: true });
        setTimeout(() => {
          resetAlert();
        }, 3000);
        return null;
      }
      const data = await response.json();
      setCustomers(data);
    }

    fetchCustomers();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: property.id,
      name: property.name,
      address: property.address,
      city: property.city,
      state: property.state,
      zipPostalCode: property.zipPostalCode,
      ownerId: property.ownerId
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const { id, name, address, city, state, zipPostalCode, ownerId } = values;

    try {
      setIsLoading(true)
      const result = await EditProperty(id, name, address, city, state, zipPostalCode, ownerId);
      setIsLoading(false)
      if (result.type === "error") {
        resetAlert();
        setAlert({ title: result.title, description: result.msg, type: result.type, show: true });
        setTimeout(() => {
          resetAlert();
        }, 3000);
        return null;
      }
      setAlert({ title: result.title, description: result.msg, type: result.type, show: true });
      setTimeout(() => {
        resetAlert();
      }, 3000);
      router.refresh();
    } catch (error) {
      resetAlert();
      setAlert({ title: "Error!", description: "Error trying to edit this property", type: "error", show: true });
      setTimeout(() => {
        resetAlert()
      }, 3000);
      console.log(error);
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[360px]">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="w-full">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Florida" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Miami" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="street name or number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="zipPostalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code (ZIP)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="123312" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="w-full">
            <FormField
              control={form.control}
              name="ownerId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Owner</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Owner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers && customers.map((customer, index) => (
                        <SelectItem key={index} textValue={customer.fullname} value={customer.id?.toString()}>
                          {customer.fullname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
          ) : (
            <>
              <IconEdit size={24} />
              <span>Update Property</span>
            </>
          )}
        </Button>
      </form >

      {alert.show && (
        <AlertComponent title={alert.title} msg={alert.description} type={alert.type} show={true} />
      )}
    </Form >
  )
}
