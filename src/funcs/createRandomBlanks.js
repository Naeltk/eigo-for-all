export const getQuestionData = (rawQuestion, blankCount = 3) => {
  const {
    conversation,
    possibleBlanks = [],
    options = []
  } = rawQuestion;

  const shuffledBlanks = [...possibleBlanks].sort(() => 0.5 - Math.random());
  const selectedBlanks = shuffledBlanks.slice(0, blankCount);

  const blanksWithIndex = [];

  for (const word of selectedBlanks) {

    const startIndex = conversation.indexOf(word);


    if (startIndex !== -1) {
      blanksWithIndex.push({ word, startIndex });
    }
  }

  blanksWithIndex.sort((a, b) => a.startIndex - b.startIndex);

  const orderedAnswers = blanksWithIndex.map(item => item.word);

  let blankedText = conversation;
  for (const word of orderedAnswers) {

    blankedText = blankedText.replace(word, '______');
  }

  const finalOptions = [...orderedAnswers, ...options].sort(() => 0.5 - Math.random());

  return {
    blankedText,
    answers: orderedAnswers,
    options: finalOptions,
  };
};