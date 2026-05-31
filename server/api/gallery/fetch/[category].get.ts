import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";
import Project from "~/models/Project";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);

  const category = event.context.params!.category;

  if (!category) {
    throw createError({ statusCode: 400, statusMessage: "Invalid category" });
  }

  let categoryValue = "";

  if (category === "komercyjne") categoryValue = "Projekt komercyjny";
  else if (category === "prywatne") categoryValue = "Projekt prywatny";
  else if (category === "completed") categoryValue = "Realizacja projektu";

  let query = supabase.from("projects").select("*");

  if (categoryValue !== "") {
    query = query.eq("category", categoryValue);
  }

  const { data, error } = await query;

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!data) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch projects.`,
    });
  }

  return (data as Project[]) ?? [];
});
