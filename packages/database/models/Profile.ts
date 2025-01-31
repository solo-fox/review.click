import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../database.types";
import err from "@workspace/error";
import logger from "@workspace/logger";

export type ProfileShow = Database["public"]["Tables"]["profiles"]["Row"];

export default class Profile {
  constructor(public client: SupabaseClient<Database>) {}

  public async show(user_id: string): Promise<NonNullable<ProfileShow>> {
    try {
      const { data, error } = await this.client
        .from("profiles")
        .select("*")
        .eq("id", user_id)
        .limit(1)
        .single();

      if (error) {
        logger.error(error.message, error.cause, error.hint);
        throw new Error(err.database.profile.show[500]);
      }
      if (data === undefined || data === null)
        throw new Error(err.database.profile.show[404]);

      return data;
    } catch (error: any) {
      logger.error(error.message, error.cause);
      throw new Error(err.database.profile.show[500]);
    }
  }
}
