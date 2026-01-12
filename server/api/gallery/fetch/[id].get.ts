import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/database.types";
import GalleryImage from "~/models/GalleryImage";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);

  const id = Number(event.context.params!.id);

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid id" });
  }

  const { data, error } = await supabase.storage
    .from("images")
    .list(id.toString());

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!data || data.length === 0) {
    return [];
  }

  const images = data.map((file, idx) => {
    const { data: image } = supabase.storage
      .from("images")
      .getPublicUrl(`${id}/${file.name}`);

    return {
      id: idx,
      url: image.publicUrl,
    };
  });

  return images as GalleryImage[];
});
