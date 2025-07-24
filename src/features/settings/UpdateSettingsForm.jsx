import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

/**
 * UpdateSettingsForm is a React component that renders a form for updating hotel booking settings.
 * It displays input fields for minimum and maximum booking nights, maximum guests per booking,
 * and breakfast price. The form uses values from the current settings and updates them on blur.
 *
 * @component
 * @returns {JSX.Element} The rendered form for updating booking settings.
 *
 * @example
 * <UpdateSettingsForm />
 *
 * @requires useSettings - Custom hook to fetch current settings and loading state.
 * @requires useUpdateSetting - Custom hook to update a specific setting.
 * @requires Spinner - Component to show loading state.
 * @requires Form, FormRow, Input - UI components for form layout and input fields.
 */
function UpdateSettingsForm() {
	const {
		isLoading,
		setting: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();
	const { isUpdating, updateSetting } = useUpdateSetting();

	if (isLoading) return <Spinner />;

	function handleUpdate(e, field) {
		const { value } = e.target;

		if (!value) return;
		updateSetting({ [field]: value });
	}

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					disabled={isUpdating}
					id="min-nights"
					defaultValue={minBookingLength}
					onBlur={(e) => handleUpdate(e, 'minBookingLength')}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking}
					onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
