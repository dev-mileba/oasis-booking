import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

/**
 * Custom hook to update application settings using React Query's useMutation.
 *
 * @returns {Object} An object containing:
 *   - isUpdating {boolean}: Indicates if the update operation is in progress.
 *   - updateSetting {function}: Function to trigger the settings update mutation.
 *
 * @example
 * const { isUpdating, updateSetting } = useUpdateSetting();
 * updateSetting(newSettings);
 */
export function useUpdateSetting() {
	const queryClient = useQueryClient();

	const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: () => {
			toast.success('Settings successfully updated');
			queryClient.invalidateQueries({ queryKey: ['settings'] });
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateSetting };
}
