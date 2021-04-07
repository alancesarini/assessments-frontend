import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid/Grid';
import Card from '@material-ui/core/Card/Card';
import Typography from '@material-ui/core/Typography/Typography';
import Badge from '@material-ui/core/Badge/Badge';

import Fetcher from './hoc/Fetcher';
import getStyles from '../services/styles';

interface TestParams {
	testId: string;
}

const useStyles = getStyles();

const TestResults = () => {
	const { testId } = useParams<TestParams>();
	const classes = useStyles();

	const _render = (data: any) => {
		return (
			<Grid
				container
				direction="row"
				alignItems="center"
				spacing={3}
				xs={12}
				md={10}
				lg={8}
			>
				{data &&
					data.questions &&
					data.questions.map((question: any, index: number) => {
						let startDate,
							startTime: any,
							endDate,
							endTime: any,
							secondsLapsed,
							minutesLapsed;

						if (
							question.answer &&
							question.answer.startTime !== null
						) {
							startDate = question.answer.startTime;
							startTime = new Date(question.answer.startTime);
						} else {
							startDate = 'Not answered';
							startTime = 0;
						}
						if (
							question.answer &&
							question.answer.endTime !== null
						) {
							endDate = question.answer.endTime;
							endTime = new Date(question.answer.endTime);
						} else {
							endTime = 0;
						}
						if (startDate !== null && endDate !== null) {
							secondsLapsed = (
								Math.floor(
									Math.abs(endTime - startTime) / 1000
								) % 60
							)
								.toString()
								.padStart(2, '0');
							minutesLapsed = Math.floor(
								Math.abs(endTime - startTime) / 1000 / 60
							);
						} else {
							secondsLapsed = 0;
							minutesLapsed = 0;
						}

						return (
							<Grid key={index} item xs={12} md={12} lg={12}>
								<Card
									elevation={3}
									className={classes.questionCard}
								>
									<Badge
										badgeContent={index + 1}
										color="primary"
										className={classes.questionBadge}
									></Badge>
									<Typography>
										question: {question.questionText}
									</Typography>
									<Typography>
										answer:{' '}
										{question.answer &&
											question.answer.text}
									</Typography>
									<Typography>
										max time: {question.maxTime}
									</Typography>
									<Typography>
										start time: {startDate}
									</Typography>
									<Typography>end time: {endDate}</Typography>
									<Typography>
										time lapsed: {minutesLapsed}:
										{secondsLapsed}
									</Typography>
								</Card>
							</Grid>
						);
					})}
			</Grid>
		);
	};

	return <Fetcher url={`/tests/${testId}/results`} render={_render} />;
};

export default TestResults;
