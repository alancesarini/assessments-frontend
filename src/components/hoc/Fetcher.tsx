import { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

import HTTPClient from '../../services/HTTPClient';

import getStyles from '../../services/styles';

interface FetcherProps {
	url: string;
	render: any;
}

const useStyles = getStyles();

const Fetcher = (props: FetcherProps) => {
	const [data, setData] = useState<any>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		setLoading(true);
		HTTPClient.get(props.url).then(
			({ data }: any) => {
				setLoading(false);
				setData(data);
			},
			(error: any) => {
				setLoading(false);
				setError(true);
			}
		);
	}, []);

	if (error) {
		return <p>ERROR!</p>;
	} else if (loading) {
		return (
			<Backdrop className={classes.backdrop} open={true}>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	} else {
		return props.render(data);
	}
};

export default Fetcher;
