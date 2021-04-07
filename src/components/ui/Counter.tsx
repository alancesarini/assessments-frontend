import Typography from '@material-ui/core/Typography/Typography';

import getStyles from '../../services/styles';

interface CounterProps {
	current: number;
	total: number;
}

const useStyles = getStyles();

const Counter = (props: CounterProps) => {
	const classes = useStyles();

	return (
		<Typography className={classes.questionIndex}>
			{props.current} / {props.total}
		</Typography>
	);
};

export default Counter;
