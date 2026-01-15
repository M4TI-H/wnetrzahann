import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";
import Project from "~/models/Project";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);

  const name = event.context.params!.category;

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: "Invalid name" });
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .ilike("name", `%${name}%`);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!data) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch projects with this criteria.`,
    });
  }

  return (data as Project[]) ?? [];
});
