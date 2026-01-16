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

  const query = getQuery(event);
  const storagePath = query.path as string;

  const { error: deleteError } = await supabase.storage
    .from("images")
    .remove([storagePath]);

  if (deleteError) {
    throw createError({
      statusCode: 500,
      statusMessage: deleteError.message,
    });
  }

  return { success: true };
});
