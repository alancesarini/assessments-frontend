import LinearProgress from '@material-ui/core/LinearProgress';

import getStyles from '../../services/styles';

interface ProgressBarProps {
	progress: number;
}

const useStyles = getStyles();

const ProgressBar = (props: ProgressBarProps) => {
	const classes = useStyles();

	return (
		<div className={classes.testContainer}>
			<LinearProgress
				value={props.progress}
				variant={'determinate'}
				className={classes.linearProgress}
			/>
		</div>
	);
};

export default ProgressBar;
