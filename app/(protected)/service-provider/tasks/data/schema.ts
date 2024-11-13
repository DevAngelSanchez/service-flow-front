import { userSchema } from "@/lib/schemas/userSchema";
import { any, z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  date: z.string(),
  provider: z.string().optional(),
});

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  subcategories: z.array(any()),
  users: z.array(any())
})

export const subcategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  mayorCategory: categorySchema.optional(),
  users: z.array(any()),
  category: z.string(),
})


export const myTaskSchema = z.object({
  id: z.number(),
  name: z.string(),
  priority: z.string(),
  status: z.string(),
  observations: z.string(),
  invoiceFile: z.string(),
  comments: z.any(),
  category: z.any(),
  subcategory: z.any(),
  property: z.any(),
  taskProvider: z.any(),
  taskProviderId: z.number(),
  categoryId: z.number(),
  subcategoryId: z.number(),
  propertyId: z.number(),
  createdBy: z.any(),
  createdById: z.number(),
  User: z.any(),
  userId: z.number(),
  datetimeAssigment: z.date(),
  datetimeEnd: z.date()
})


export const propertySchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  city: z.string(),
  state: z.string(),
  zipPostalCode: z.string(),
  ownerId: z.string().optional(),
})


export type Task = z.infer<typeof taskSchema>
export type SubcategoryType = z.infer<typeof subcategorySchema>
export type PropertyType = z.infer<typeof propertySchema>