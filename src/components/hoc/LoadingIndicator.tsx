import Backdrop from '@material-ui/core/Backdrop/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

import getStyles from '../../services/styles';

interface withLoadingProps {
	loading: boolean;
	render: any;
}

const useStyles = getStyles();

const LoadingIndicator = (props: withLoadingProps) => {
	const classes = useStyles();

	return props.loading ? (
		<Backdrop className={classes.backdrop} open={true}>
			<CircularProgress color="inherit" />
		</Backdrop>
	) : (
		props.render()
	);
};

export default LoadingIndicator;
