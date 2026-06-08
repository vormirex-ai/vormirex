import mongoose from 'mongoose';

const DATABASE_URL = "mongodb+srv://singh543151:uwXtrOZypG52aq7y@cluster0.bkuxpfk.mongodb.net/vormirex_db?retryWrites=true&w=majority&appName=Cluster0";

const SubjectSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  icon: String,
  price: Number,
  isPro: Boolean,
  hasCertificate: Boolean,
  status: String,
  tags: [String],
}, { timestamps: true });

const QuizQuestionSchema = new mongoose.Schema({
  subjectId: String,
  questionText: String,
  options: [String],
  correctAnswer: String,
  explanation: String,
  difficulty: String,
}, { timestamps: true });

const Subject = mongoose.model('Subject', SubjectSchema);
const QuizQuestion = mongoose.model('QuizQuestion', QuizQuestionSchema);

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(DATABASE_URL);
    console.log('Connected successfully!');

    // 1. Check/Create Subject
    let subject = await Subject.findOne({ title: 'Introduction to JavaScript' });
    if (!subject) {
      console.log('Creating subject "Introduction to JavaScript"...');
      subject = await Subject.create({
        title: 'Introduction to JavaScript',
        subtitle: 'Master the basics of JavaScript programming',
        description: 'Learn the fundamentals of JavaScript, including variables, data types, control flow, functions, objects, and basic DOM manipulation.',
        icon: 'javascript-icon',
        price: 0,
        isPro: false,
        hasCertificate: true,
        status: 'PUBLISHED',
        tags: ['javascript', 'programming', 'webdev', 'frontend'],
      });
    }
    console.log('Subject ID:', subject._id.toString());

    // 2. Clear old questions for this subject
    const subjectId = subject._id.toString();
    const deleteRes = await QuizQuestion.deleteMany({ subjectId });
    console.log(`Cleared ${deleteRes.deletedCount} existing questions for this subject.`);

    // 3. Questions list
    const questions = [
      {
        subjectId,
        questionText: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        options: [
          '<script href="xxx.js">',
          '<script name="xxx.js">',
          '<script src="xxx.js">',
          '<script file="xxx.js">'
        ],
        correctAnswer: '<script src="xxx.js">',
        explanation: 'The "src" attribute specifies the URL of an external script file in HTML.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'How do you write "Hello World" in an alert box?',
        options: [
          'msgBox("Hello World");',
          'alertBox("Hello World");',
          'msg("Hello World");',
          'alert("Hello World");'
        ],
        correctAnswer: 'alert("Hello World");',
        explanation: 'The alert() method displays an alert box with a message and an OK button.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'How do you create a function in JavaScript?',
        options: [
          'function myFunction()',
          'function:myFunction()',
          'function = myFunction()',
          'create myFunction()'
        ],
        correctAnswer: 'function myFunction()',
        explanation: 'In JavaScript, a function is defined with the "function" keyword, followed by a name, followed by parentheses.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'How do you call a function named "myFunction"?',
        options: [
          'call function myFunction()',
          'call myFunction()',
          'myFunction()',
          'myFunction(call)'
        ],
        correctAnswer: 'myFunction()',
        explanation: 'To invoke/call a function in JavaScript, you write the function name followed by parentheses.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'How to write an IF statement in JavaScript?',
        options: [
          'if i = 5 then',
          'if i == 5 then',
          'if (i == 5)',
          'if i = 5'
        ],
        correctAnswer: 'if (i == 5)',
        explanation: 'The condition of an "if" statement in JavaScript must always be enclosed in parentheses.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'How does a FOR loop start?',
        options: [
          'for (i = 0; i <= 5; i++)',
          'for (i <= 5; i++)',
          'for i = 1 to 5',
          'for (i = 0; i <= 5)'
        ],
        correctAnswer: 'for (i = 0; i <= 5; i++)',
        explanation: 'A standard JavaScript for loop contains initialization (i = 0), a condition (i <= 5), and an increment (i++) separated by semicolons.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'What is the correct way to write a JavaScript array?',
        options: [
          'var colors = (1:"red", 2:"green", 3:"blue")',
          'var colors = ["red", "green", "blue"]',
          'var colors = "red", "green", "blue"',
          'var colors = 1 = ("red"), 2 = ("green")'
        ],
        correctAnswer: 'var colors = ["red", "green", "blue"]',
        explanation: 'JavaScript arrays are written using square brackets, and elements are separated by commas.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'How do you round the number 7.25 to the nearest integer?',
        options: [
          'round(7.25)',
          'Math.rnd(7.25)',
          'Math.round(7.25)',
          'rnd(7.25)'
        ],
        correctAnswer: 'Math.round(7.25)',
        explanation: 'The Math.round() method rounds a number to the nearest integer.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'Which operator is used to assign a value to a variable?',
        options: [
          '*',
          '=',
          '-',
          'x'
        ],
        correctAnswer: '=',
        explanation: 'The "=" operator is the assignment operator in JavaScript.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'What will the following code return: Boolean(10 > 9)?',
        options: [
          'true',
          'false',
          'NaN',
          'undefined'
        ],
        correctAnswer: 'true',
        explanation: 'Since 10 is greater than 9, this expression evaluates to the boolean value true.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'Which method adds one or more elements to the end of an array?',
        options: [
          'push()',
          'pop()',
          'shift()',
          'unshift()'
        ],
        correctAnswer: 'push()',
        explanation: 'The push() method appends elements to the end of an array and returns the new length.',
        difficulty: 'Beginner'
      },
      {
        subjectId,
        questionText: 'Which data type is NOT primitive in JavaScript?',
        options: [
          'Number',
          'String',
          'Boolean',
          'Object'
        ],
        correctAnswer: 'Object',
        explanation: 'Objects are reference types in JavaScript. Numbers, Strings, and Booleans are primitives.',
        difficulty: 'Beginner'
      }
    ];

    // 4. Insert Questions
    console.log(`Inserting ${questions.length} questions...`);
    await QuizQuestion.insertMany(questions);
    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

seed();
