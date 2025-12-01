export function orderedBlanks(rawSentence) {
  const { sentence, blanks = [] } = rawSentence;

  const blanksWithIndex = [];

  for (const word of blanks) {
    const regex = new RegExp(`\\b${word}\\b`);
    const startIndex = sentence.search(regex);

    if (startIndex !== -1) {
      blanksWithIndex.push({ word, startIndex });
    }
  }

  blanksWithIndex.sort((a, b) => a.startIndex - b.startIndex);

  const orderedAnswers = blanksWithIndex.map(item => item.word);

  let blankedText = sentence;
  for (const word of orderedAnswers) {
    const replaceRegex = new RegExp(`\\b${word}\\b`);
    blankedText = blankedText.replace(replaceRegex, '______');
  }

  const finalOptions = [...blanks].sort(() => 0.5 - Math.random());

  return {
    blankedText,
    answers: orderedAnswers,
    options: finalOptions,
  };
}