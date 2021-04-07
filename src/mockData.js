const mockData = {
	title: 'Assessment for UI candidates',
	instructions: [
		'Please consider that you could run out of time, if you need to test or search for everything.',
		"Questions are supposed to be answered with a short answer. Something in between 1-2 lines. Don't waste time in long explanations. It time runs out, you will be redirected to the next question.",
		"IMPORTANT: don't try to reload the page. If you do you will be redirected to the next question and you will lose the chance to answer the current question.",
	],
	questions: [
		{
			id: 'q1',
			questionText:
				'How could you check the model you receive from an API endpoint in the browser?',
			imageUrl: '',
			maxTime: 1,
			answer: {
				text: '',
				startTime: '',
				endTime: '',
			},
		},
		{
			id: 'q2',
			questionText:
				'Given the following array [1, 2, 3, 4, 5], write the code to return the sum of all members in the array?',
			//imageUrl: '/images/tests/question23.png',
			imageUrl: '',
			maxTime: 3,
			answer: {
				text: '',
				startTime: '',
				endTime: '',
			},
		},
		{
			id: 'q3',
			questionText:
				'What would you use to share the available horizontal space between three components that are contained inside the same div element?',
			imageUrl: '',
			maxTime: 2,
			answer: {
				text: '',
				startTime: '',
				endTime: '',
			},
		},
	],
};

export default mockData;
