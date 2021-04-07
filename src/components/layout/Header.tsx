import getStyles from '../../services/styles';

const useStyles = getStyles();

const Header = () => {
	const classes = useStyles();

	return (
		<img
			className={classes.logo}
			src="/images/logo-innoveo.jpg"
			alt={'logo'}
		/>
	);
};

export default Header;
