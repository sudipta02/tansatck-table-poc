import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  date: z.string(),
  destination_id: z.string(),
  destination_name: z.string(),
  source_name: z.string(),
  source_id: z.string(),
});
