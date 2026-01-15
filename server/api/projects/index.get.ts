import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";
import Project from "~/models/Project";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const query = getQuery(event);

  const limit = Number(query.limit) || 2;
  const category = query.category as string;
  const searchedName = query.search as string;

  let dbQuery = supabase.from("projects").select("*");

  if (category && category !== "wszystkie") {
    const categoryMap: Record<string, string> = {
      komercyjne: "Projekt komercyjny",
      prywatne: "Projekt prywatny",
    };
    dbQuery = dbQuery.eq("category", categoryMap[category] || category);
  }

  if (searchedName) {
    dbQuery = dbQuery.ilike("name", `%${searchedName}%`);
  }

  const { data, error } = await dbQuery
    .order("creation_date", {
      ascending: false,
    })
    .range(0, limit - 1);

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
