import { useRef, useState, useEffect } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';

import getStyles from '../services/styles';

export interface QuestionProps {
	questionText: string;
	imageUrl: string;
	maxTime: number;
	pasteAllowed: boolean;
	value?: string;
	changeHandler?: any;
	answer?: {
		text: string;
		startTime: string;
		endTime: string;
	};
}

export interface QuestionData {
	_id: string;
	questionText: string;
	imageUrl: string;
	maxTime: number;
	pasteAllowed: boolean;
	answer: {
		_id: string;
		text: string;
		startTime: string;
		endTime: string;
	};
}

const useStyles = getStyles();

const Question = (props: QuestionProps) => {
	const { questionText, imageUrl, pasteAllowed } = props;
	const [imageLoaded, setImageLoaded] = useState(false);

	const classes = useStyles();
	const textareaRef = useRef();

	useEffect(() => {
		const questionImage = new Image();
		questionImage.src = imageUrl;
		questionImage.onload = () => setImageLoaded(true);
	}, []);

	const _pasteHandler = (event: any) => {
		if (!pasteAllowed) {
			event.preventDefault();
			return false;
		}

		return true;
	};

	const copyPasteMessage = `copy&paste ${pasteAllowed ? '' : 'not '}allowed`;

	return (
		<div className={classes.questionContainer}>
			<Grid container direction="column" spacing={2}>
				<Grid item xs={12}>
					<Typography component="p">{questionText}</Typography>
				</Grid>

				{imageUrl && imageLoaded && (
					<Grid item xs={12}>
						<img
							src={imageUrl}
							className={classes.image}
							alt={'test'}
						/>
					</Grid>
				)}

				<Grid item xs={12}>
					<TextareaAutosize
						ref={textareaRef.current}
						className={classes.textarea}
						value={props.value}
						rowsMin={5}
						placeholder={'Type your answer here...'}
						onChange={props.changeHandler}
						onPaste={_pasteHandler}
					/>
					<span className={classes.hint}>{copyPasteMessage}</span>
				</Grid>
			</Grid>
		</div>
	);
};

export default Question;
