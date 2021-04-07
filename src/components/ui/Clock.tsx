import { Typography } from '@material-ui/core';

interface ClockProps {
	timeInSeconds: number;
}

const Clock = (props: ClockProps) => {
	const minutes = Math.floor(props.timeInSeconds / 60);
	const seconds = props.timeInSeconds % 60;

	return (
		<Typography
			component="p"
			color={minutes === 0 && seconds <= 30 ? 'error' : 'primary'}
		>
			{minutes.toString().padStart(2, '0')}:
			{seconds.toString().padStart(2, '0')}
		</Typography>
	);
};

export default Clock;
