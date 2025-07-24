import supabase from "./supabase";

/**
 * Fetches the settings from the "settings" table in the Supabase database.
 *
 * @async
 * @function getSettings
 * @returns {Promise<Object>} The settings data retrieved from the database.
 * @throws {Error} If the settings could not be loaded.
 */
export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
/**
 * Updates the single settings row in the "settings" table with the provided newSetting object.
 * Assumes there is only one settings row with id=1.
 *
 * @async
 * @param {Object} newSetting - The new settings values to update.
 * @returns {Promise<Object>} The updated settings data.
 * @throws {Error} If the settings could not be updated.
 */
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
