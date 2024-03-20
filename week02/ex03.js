import dayjs from "dayjs";

function Answer(text, username, score = 0, date, id) {
  this.response = text;
  this.username = username;
  this.score = score;
  this.date = dayjs(date);
  this.id = id;
  this.toString = () =>
    `${this.username} replied ${this.response} on ${this.date.format(
      "YYYY-MM-DD"
    )} and got a score of ${this.score}`;
}

function Question(text, name, date, answers = [], id) {
  this.text = text;
  this.name = name;
  this.date = dayjs(date);
  this.answers = answers;
  this.id = id;
  // pass a fully-constructed Answer object
  this.add = (answer) => {
    this.answers.push(answer);
  };
  // returns all the Answers of a given person
  this.find = (id) => this.answers.filter((answer) => answer.id === id);
  // returns an array of Answers after the given date
  this.afterDate = (date) =>
    this.answers.filter((answer) => answer.isAfter(dayjs(date)));
  // returns an array of Answers, sorted by increasing date
  this.listByDate = () =>
    [...this.answers].sort((a, b) => (a.date.isAfter(b.date) ? 1 : -1));
  // returns an array of Answers, sorted by decreasing score
  this.listByScore = () => [...this.answers].sort((a, b) => b.score - a.score);
}

// Sample Answers
const answers = [];
answers.push(new Answer("Great job!", "John Doe", 9, "2024-03-11", 1));
answers.push(new Answer("Well done!", "Jane Smith", 8, "2024-03-10", 2));
answers.push(new Answer("Keep it up!", "Alice Johnson", 7, "2024-03-13", 3));
answers.push(new Answer("Nice effort!", "Bob Anderson", 6, "2024-03-12", 4));
answers.push(new Answer("Impressive!", "John Doe", 9, "2024-03-14", 1));
answers.push(new Answer("Amazing!", "Alice Johnson", 8, "2024-03-17", 3));
answers.push(new Answer("Awesome work!", "Jane Smith", 7, "2024-03-16", 2));
answers.push(new Answer("Well executed!", "Bob Anderson", 8, "2024-03-11", 4));
answers.push(new Answer("Fantastic effort!", "John Doe", 9, "2024-03-14", 1));
answers.push(new Answer("Bravo!", "Alice Johnson", 7, "2024-03-13", 3));

// Sample Questions
const question = new Question("Q1", "Luca", "2024-03-24", answers, 10);

// Test
console.log("Find answers of John Doe:");
console.log(question.find(1));
console.log("\nAfter date 2024-03-12:");
console.log(question.afterDate("2024-03-12"));
console.log("\nOrder by date ASC:");
console.log(question.listByDate());
console.log("\nOrder by score DESC:");
console.log(question.listByScore());
