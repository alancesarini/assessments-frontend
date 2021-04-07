import { useState } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import {
	Button,
	createMuiTheme,
	ThemeProvider,
	CssBaseline,
} from '@material-ui/core';
import { BrowserRouter, RouteComponentProps } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import Header from './components/layout/Header';
import Test from './components/Test';
import TestResults from './components/TestResults';
import getStyles from './services/styles';

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#90caf9',
		},
	},
});

const useStyles = getStyles(darkTheme);

const App = () => {
	const [testStarted, setTestStarted] = useState(false);
	const classes = useStyles();

	const _renderTestIntro = () => {
		return (
			<>
				<Grid item xs={12} md={8} lg={6}>
					<Test hasStartedTest={false} />
				</Grid>
				<Grid item xs={12} md={8} lg={6}>
					<Button
						variant="contained"
						color="primary"
						onClick={() => setTestStarted(true)}
					>
						Start test
					</Button>
				</Grid>
			</>
		);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className={classes.root}>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={3}
				>
					<Grid item xs={12}>
						<Header />
					</Grid>

					<BrowserRouter>
						<Switch>
							<Route
								path={'/test/:testId/results'}
								exact={true}
								render={(props: RouteComponentProps<any>) => (
									<TestResults />
								)}
							/>
							<Route
								path={'/test/:testId'}
								exact={true}
								render={(props: RouteComponentProps<any>) => {
									if (!testStarted) {
										return _renderTestIntro();
									} else {
										return <Test hasStartedTest={true} />;
									}
								}}
							/>
							<Route
								render={(props: RouteComponentProps<any>) => (
									<p>Test not found</p>
								)}
							/>
						</Switch>
					</BrowserRouter>
				</Grid>
			</div>
		</ThemeProvider>
	);
};

export default App;
