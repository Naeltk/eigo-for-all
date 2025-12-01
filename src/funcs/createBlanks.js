export function createBlanks(sentence, verb) {
  const blankedSentence = sentence.replace(verb, "______");
  return { blankedSentence, answer: verb };
}

