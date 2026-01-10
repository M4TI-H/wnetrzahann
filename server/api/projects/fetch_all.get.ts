import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";
import Project from "~/models/Project";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("creation_date", { ascending: false });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!data) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch projects.",
    });
  }

  return (data as Project[]) ?? [];
});
