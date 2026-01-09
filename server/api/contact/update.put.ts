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

  type ContactType =
    | "email"
    | "phone"
    | "facebook"
    | "instagram"
    | "linkedin"
    | "youtube";

  const body = await readBody<{
    type: ContactType;
    value: string;
  }>(event);

  const { error } = await supabase
    .from("contact")
    .update({ [body.type]: body.value })
    .eq("user", 1);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { success: true };
});
