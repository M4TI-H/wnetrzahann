import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "~/database.types";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const body = await readBody<{ project_id: number; url: string }[]>(event);

  const { error } = await supabase.from("project_images").insert(body).select();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { success: true };
});
