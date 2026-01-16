import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "User not authenticated",
    });
  }

  const id = Number(event.context.params!.id);

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid id" });
  }

  type ProjectCategory = "Projekt komercyjny" | "Projekt prywatny";

  const body = await readBody<{
    name: string;
    category: ProjectCategory;
    area: number;
    creation_date?: string;
    cover: string;
  }>(event);

  const { data, error } = await supabase
    .from("projects")
    .update({
      name: body.name,
      category: body.category,
      area: body.area,
      creation_date: body.creation_date,
      cover: body.cover,
    })
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!data) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to update project ${id}.`,
    });
  }

  return data;
});
