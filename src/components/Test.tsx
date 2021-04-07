import { useEffect, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card';
import { useParams } from 'react-router';

import HTTPClient from '../services/HTTPClient';
import Question from './Question';
import Clock from './ui/Clock';
import ProgressBar from './ui/ProgressBar';
import Counter from './ui/Counter';
import getStyles from '../services/styles';
import LoadingIndicator from './hoc/LoadingIndicator';

interface TestProps {
	hasStartedTest: boolean;
}

interface TestParams {
	testId: string;
}

interface TestData {
	title: string;
	instructions: [string];
}

interface QuestionData {
	index: number;
	questionText: string;
	imageUrl: string;
	maxTime: number;
	pasteAllowed: boolean;
}

const useStyles = getStyles();

const Test = (props: TestProps) => {
	const [loading, setLoading] = useState(false);
	const [testData, setTestData] = useState<TestData>();
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState<QuestionData>();
	const [progress, setProgress] = useState(100);
	const [timer, setTimer] = useState(1);
	const [answer, setAnswer] = useState('');
	const [testFinished, setTestFinished] = useState(false);
	const interval = useRef();
	const { testId } = useParams<TestParams>();
	let questionData: any;

	useEffect(() => {
		if (props.hasStartedTest) {
			setLoading(true);
			HTTPClient.get(`/tests/${testId}/count`).then(({ data }: any) => {
				setTotalQuestions(data.total);
				HTTPClient.get(`/tests/${testId}/current`).then(
					({ data }: any) => {
						setLoading(false);
						questionData = data;
						setCurrentQuestion(questionData);
					},
					(error: any) => {
						setLoading(false);
						if (error.response.status === 404) {
							setTestFinished(true);
						}
					}
				);
			});
		} else {
			setLoading(true);
			HTTPClient.get(`/tests/${testId}`).then(
				({ data }: any) => {
					setLoading(false);
					setTestData(data);
				},
				(error: any) => {
					setLoading(false);
				}
			);
		}
	}, []);

	useEffect(() => {
		if (currentQuestion && currentQuestion.index !== -1) {
			if (currentQuestion.index > totalQuestions) {
				clearInterval(interval.current);
			} else {
				setAnswer('');
				setProgress(100);
				setTimer(currentQuestion.maxTime * 60);
				const intervalId = setInterval(() => {
					setTimer((prevTimer) => prevTimer - 1);
				}, 1000);
				interval.current = intervalId as any;
			}
		}

		return () => {
			clearInterval(interval.current);
		};
	}, [currentQuestion]);

	useEffect(() => {
		if (currentQuestion && currentQuestion.index !== -1) {
			const currentProgress = Math.floor(
				(timer / currentQuestion.maxTime) * 100
			);
			setProgress(() => currentProgress);
		}
	}, [timer]);

	useEffect(() => {
		if (progress === 0) {
			_submitAnswer();
		}
	}, [progress]);

	const classes = useStyles();

	const _answerChangedHandler = (event: any) => {
		setAnswer(event.target.value);
	};

	const _submitAnswerHandler = () => {
		_submitAnswer();
	};

	const _submitAnswer = () => {
		clearInterval(interval.current);
		setLoading(true);
		const payload = { answer };
		HTTPClient.post(
			`/tests/${testId}/questions/${
				(currentQuestion || {}).index
			}/answer`,
			payload
		).then(
			({ data }: any) => {
				if (currentQuestion && currentQuestion.index < totalQuestions) {
					HTTPClient.get(
						`/tests/${testId}/questions/${
							currentQuestion.index + 1
						}`
					).then(
						({ data }: any) => {
							setLoading(false);
							questionData = data;
							setCurrentQuestion(questionData);
						},
						(error: any) => {
							setLoading(false);
							console.log(error);
						}
					);
				} else {
					setLoading(false);
					setTestFinished(true);
				}
			},
			(error: any) => {
				setLoading(false);
				console.log(error);
			}
		);
	};

	const _renderTestInstructions = () => {
		return (
			<>
				<Typography variant={'h4'} align={'center'} gutterBottom={true}>
					{testData && testData.title}
				</Typography>
				{testData &&
					testData.instructions &&
					testData.instructions.map((p, index) => (
						<Typography key={index} gutterBottom={true}>
							{p}
						</Typography>
					))}
			</>
		);
	};

	const _renderTest = () => {
		return (
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
			>
				{currentQuestion && !testFinished && (
					<>
						<Grid item xs={12} md={8} lg={6}>
							<Clock timeInSeconds={timer} />
							<ProgressBar progress={progress} />
						</Grid>
						<Grid item xs={12} md={8} lg={6}>
							<div className={classes.testContainer}>
								<Counter
									current={currentQuestion.index}
									total={totalQuestions}
								/>
								<Card className={classes.card}>
									<Question
										questionText={
											currentQuestion.questionText
										}
										imageUrl={currentQuestion.imageUrl}
										pasteAllowed={
											currentQuestion.pasteAllowed
										}
										maxTime={currentQuestion.maxTime}
										value={answer}
										changeHandler={_answerChangedHandler}
									/>
								</Card>
							</div>
						</Grid>
						<Grid item xs={12} md={8} lg={6}>
							<Button
								variant="contained"
								color="primary"
								onClick={_submitAnswerHandler}
								disabled={loading}
							>
								Submit answer
							</Button>
						</Grid>
					</>
				)}

				{testFinished && (
					<Grid item xs={12}>
						<Typography
							variant="h5"
							gutterBottom={true}
							align={'center'}
						>
							End of test
						</Typography>
						<Typography>
							Thank you for your time. We will contact you
							shortly.
						</Typography>
					</Grid>
				)}
			</Grid>
		);
	};

	const _render = () => {
		return (
			<>
				{!props.hasStartedTest && _renderTestInstructions()}
				{props.hasStartedTest && _renderTest()}
			</>
		);
	};

	return <LoadingIndicator loading={loading} render={_render} />;
};

export default Test;
