import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

/**
 * Custom React hook to fetch application settings.
 *
 * Utilizes the `useQuery` hook to asynchronously retrieve settings data.
 *
 * @returns {Object} An object containing:
 *   - {boolean} isLoading - Indicates if the settings are currently being loaded.
 *   - {Error|null} error - Error object if the fetch failed, otherwise null.
 *   - {any} setting - The fetched settings data.
 */
export function useSettings() {
	const {
		isLoading,
		error,
		data: setting,
	} = useQuery({ queryKey: ['settings'], queryFn: getSettings });
	return { isLoading, error, setting };
}
