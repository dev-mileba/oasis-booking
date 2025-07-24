import supabase, { supabaseUrl } from './supabase';

/**
 * Fetches all cabins from the 'cabins' table using Supabase.
 *
 * @async
 * @function
 * @returns {Promise<Array<Object>>} Resolves to an array of cabin objects.
 * @throws {Error} Throws an error if cabins could not be loaded.
 */
export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
	}

	return data;
}

/**
 * Creates or edits a cabin entry in the database and handles image upload.
 *
 * @async
 * @param {Object} newCabin - The cabin data to create or update.
 * @param {string} [newCabin.image] - The image file or image path for the cabin.
 * @param {string} [id] - The ID of the cabin to edit. If not provided, a new cabin is created.
 * @returns {Promise<Object>} The created or updated cabin data.
 * @throws {Error} If the cabin could not be created or the image could not be uploaded.
 */
export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		'/',
		''
	);
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create/edit cabin
	let query = supabase.from('cabins');

	// A) CREATE
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// B) EDIT
	if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be created');
	}

	// 2. Upload image
	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// 3. Delete the cabin IF there was an error uplaoding image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.error(storageError);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		);
	}

	return data;
}

/**
 * Deletes a cabin from the 'cabins' table by its ID.
 *
 * @async
 * @function deleteCabin
 * @param {number|string} id - The unique identifier of the cabin to delete.
 * @returns {Promise<Object>} The data returned from the delete operation.
 * @throws {Error} Throws an error if the cabin could not be deleted.
 */
export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabin could not be deleted');
	}

	return data;
}
