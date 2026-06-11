import mongoose from 'mongoose';

const DATABASE_URL = "mongodb+srv://singh543151:uwXtrOZypG52aq7y@cluster0.bkuxpfk.mongodb.net/vormirex_db?retryWrites=true&w=majority&appName=Cluster0";

const SubjectSchema = new mongoose.Schema({
  title: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  xp: Number,
  flashcardStreak: {
    current: Number,
    longest: Number,
    lastActivityDate: Date
  }
});

const FlashcardDeckSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjectId: { type: String, required: true },
  subjectName: { type: String, required: true },
  totalCards: { type: Number, default: 0 },
  icon: { type: String },
  isPublic: { type: Boolean, default: true }
}, { timestamps: true });

const FlashcardSchema = new mongoose.Schema({
  deckId: { type: mongoose.Schema.Types.ObjectId, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  hint: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' }
}, { timestamps: true });

const FlashcardProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, required: true },
  deckId: { type: mongoose.Schema.Types.ObjectId, required: true },
  lastRating: { type: String, enum: ['wrong', 'close', 'correct'] },
  attempts: { type: Number, default: 0 },
  userAnswer: { type: String },
  nextReviewDate: { type: Date, required: true },
  lastReviewed: { type: Date }
}, { timestamps: true });

const FlashcardSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  deckId: { type: mongoose.Schema.Types.ObjectId, required: true },
  score: { type: Number, required: true },
  xpEarned: { type: Number, required: true },
  results: [
    {
      cardId: { type: mongoose.Schema.Types.ObjectId, required: true },
      rating: { type: String, enum: ['wrong', 'close', 'correct'], required: true }
    }
  ]
}, { timestamps: true });

const Subject = mongoose.model('Subject', SubjectSchema);
const User = mongoose.model('User', UserSchema);
const FlashcardDeck = mongoose.model('FlashcardDeck', FlashcardDeckSchema);
const Flashcard = mongoose.model('Flashcard', FlashcardSchema);
const FlashcardProgress = mongoose.model('FlashcardProgress', FlashcardProgressSchema);
const FlashcardSession = mongoose.model('FlashcardSession', FlashcardSessionSchema);

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(DATABASE_URL);
    console.log('Connected successfully!');

    // 1. Find the JavaScript subject ID
    const subject = await Subject.findOne({ title: 'Introduction to JavaScript' });
    if (!subject) {
      console.log('Subject "Introduction to JavaScript" not found.');
      return;
    }
    const jsSubjectId = subject._id.toString();
    console.log('Found JavaScript Subject ID:', jsSubjectId);

    // 2. Find the user
    const email = 'ashishsingh4895@gmail.com';
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found.`);
      return;
    }
    const userId = user._id;
    console.log('Found User ID:', userId.toString());

    // 3. Clean existing flashcard data for this subject/deck/user
    // Find JS decks to clean their cards
    const existingDecks = await FlashcardDeck.find({ subjectId: jsSubjectId });
    const deckIds = existingDecks.map(d => d._id);

    await Flashcard.deleteMany({ deckId: { $in: deckIds } });
    await FlashcardProgress.deleteMany({ userId, deckId: { $in: deckIds } });
    await FlashcardSession.deleteMany({ userId, deckId: { $in: deckIds } });
    await FlashcardDeck.deleteMany({ subjectId: jsSubjectId });
    console.log('Cleared existing flashcard data.');

    // 4. Create new JS Deck
    const deck = await FlashcardDeck.create({
      name: 'JavaScript Basics',
      subjectId: jsSubjectId,
      subjectName: 'Introduction to JavaScript',
      totalCards: 6,
      icon: '💻',
      isPublic: true
    });
    const deckId = deck._id;
    console.log('Created Deck ID:', deckId.toString());

    // 5. Create Flashcards
    const cards = [
      {
        deckId,
        question: "What is the correct syntax to output 'Hello World' in JavaScript?",
        answer: "console.log('Hello World');",
        hint: "It uses the console object's log method.",
        difficulty: "Easy"
      },
      {
        deckId,
        question: "How do you declare a block-scoped variable in JavaScript?",
        answer: "Using 'let' or 'const'.",
        hint: "Avoid the legacy 'var' keyword.",
        difficulty: "Easy"
      },
      {
        deckId,
        question: "What is the difference between '==' and '===' operators?",
        answer: "'==' compares values after type coercion, whereas '===' compares both values and types without coercion.",
        hint: "Strict equality vs Loose equality.",
        difficulty: "Medium"
      },
      {
        deckId,
        question: "How can you add a new element to the end of an array?",
        answer: "Using the '.push()' method.",
        hint: "It mutates the original array and returns the new length.",
        difficulty: "Easy"
      },
      {
        deckId,
        question: "What is a closure in JavaScript?",
        answer: "A function that remembers and accesses variables from its outer scope even after the outer function has finished executing.",
        hint: "Lexical scoping rules.",
        difficulty: "Hard"
      },
      {
        deckId,
        question: "What does 'typeof null' return?",
        answer: "'object'",
        hint: "This is a well-known historical bug in JavaScript.",
        difficulty: "Medium"
      }
    ];

    console.log('Inserting flashcards...');
    const insertedCards = await Flashcard.insertMany(cards);
    console.log(`Inserted ${insertedCards.length} flashcards.`);

    // 6. Create Progress status for first 3 cards
    const now = new Date();
    
    // Card 1: Correct (Mastered, next review in 3 days)
    const nextReviewCorrect = new Date();
    nextReviewCorrect.setDate(now.getDate() + 3);

    // Card 2: Wrong (Due today, next review is past)
    const nextReviewWrong = new Date();
    nextReviewWrong.setDate(now.getDate() - 1);

    // Card 3: Close (Next review in 1 day)
    const nextReviewClose = new Date();
    nextReviewClose.setDate(now.getDate() + 1);

    const progressEntries = [
      {
        userId,
        cardId: insertedCards[0]._id,
        deckId,
        lastRating: 'correct',
        attempts: 1,
        userAnswer: "console.log('Hello World')",
        nextReviewDate: nextReviewCorrect,
        lastReviewed: now
      },
      {
        userId,
        cardId: insertedCards[1]._id,
        deckId,
        lastRating: 'wrong',
        attempts: 1,
        userAnswer: "var x = 10",
        nextReviewDate: nextReviewWrong,
        lastReviewed: now
      },
      {
        userId,
        cardId: insertedCards[2]._id,
        deckId,
        lastRating: 'close',
        attempts: 1,
        userAnswer: "=== checks types, == doesn't",
        nextReviewDate: nextReviewClose,
        lastReviewed: now
      }
    ];

    await FlashcardProgress.insertMany(progressEntries);
    console.log('Seeded progress status entries.');

    // 7. Seed completed Flashcard Session (yesterday)
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    await FlashcardSession.create({
      userId,
      deckId,
      score: 83,
      xpEarned: 35,
      results: [
        { cardId: insertedCards[0]._id, rating: 'correct' },
        { cardId: insertedCards[1]._id, rating: 'wrong' },
        { cardId: insertedCards[2]._id, rating: 'correct' }
      ],
      createdAt: yesterday,
      updatedAt: yesterday
    });
    console.log('Seeded completed flashcard session.');

    // 8. Update User's Streak
    user.flashcardStreak = {
      current: 3,
      longest: 5,
      lastActivityDate: yesterday
    };
    user.xp = (user.xp || 0) + 35;
    await user.save();
    console.log('Updated user streak and XP successfully.');

    console.log('Database seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

seed();
