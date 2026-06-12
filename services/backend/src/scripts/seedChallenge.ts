import mongoose from 'mongoose';

const DATABASE_URL = "mongodb+srv://singh543151:uwXtrOZypG52aq7y@cluster0.bkuxpfk.mongodb.net/vormirex_db?retryWrites=true&w=majority&appName=Cluster0";

const SubjectSchema = new mongoose.Schema({
  title: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  xp: Number,
  challengeStreak: {
    current: Number,
    longest: Number,
    lastActivityDate: Date
  },
  learningPreferences: {
    selectedSubjects: [String]
  }
});

const ChallengeResultSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  dateString: String,
  score: Number,
  xpEarned: Number,
  timeSpent: Number,
  questionsCorrect: Number,
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selectedOption: String,
      isCorrect: Boolean,
      timeToAnswer: Number
    }
  ]
}, { timestamps: true });

const Subject = mongoose.model('Subject', SubjectSchema);
const User = mongoose.model('User', UserSchema);
const ChallengeResult = mongoose.model('ChallengeResult', ChallengeResultSchema);

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(DATABASE_URL);
    console.log('Connected successfully!');

    // Find the JavaScript subject ID
    const subject = await Subject.findOne({ title: 'Introduction to JavaScript' });
    if (!subject) {
      console.log('Subject "Introduction to JavaScript" not found. Please seed quizzes first.');
      return;
    }
    const jsSubjectId = subject._id.toString();
    console.log('Found JavaScript Subject ID:', jsSubjectId);

    // Find the user
    const email = 'ashishsingh4895@gmail.com';
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found. Seeding aborted.`);
      return;
    }
    console.log('Found User ID:', user._id.toString());

    // Clear old challenge results for this user
    const userId = user._id;
    const deleteRes = await ChallengeResult.deleteMany({ userId });
    console.log(`Cleared ${deleteRes.deletedCount} existing challenge results.`);

    // Mock question IDs
    const mockQuestionId1 = new mongoose.Types.ObjectId();
    const mockQuestionId2 = new mongoose.Types.ObjectId();

    // Data for Mon (June 8), Tue (June 9), Wed (June 10)
    const challenges = [
      {
        userId,
        dateString: '2026-06-08',
        score: 80,
        xpEarned: 120,
        timeSpent: 45,
        questionsCorrect: 4,
        answers: [
          { questionId: mockQuestionId1, selectedOption: 'A', isCorrect: true, timeToAnswer: 8000 },
          { questionId: mockQuestionId2, selectedOption: 'B', isCorrect: true, timeToAnswer: 7000 },
          { questionId: mockQuestionId1, selectedOption: 'C', isCorrect: true, timeToAnswer: 12000 },
          { questionId: mockQuestionId2, selectedOption: 'D', isCorrect: true, timeToAnswer: 9000 },
          { questionId: mockQuestionId1, selectedOption: 'A', isCorrect: false, timeToAnswer: 9000 }
        ]
      },
      {
        userId,
        dateString: '2026-06-09',
        score: 100,
        xpEarned: 150,
        timeSpent: 38,
        questionsCorrect: 5,
        answers: [
          { questionId: mockQuestionId1, selectedOption: 'A', isCorrect: true, timeToAnswer: 5000 },
          { questionId: mockQuestionId2, selectedOption: 'B', isCorrect: true, timeToAnswer: 6000 },
          { questionId: mockQuestionId1, selectedOption: 'C', isCorrect: true, timeToAnswer: 8000 },
          { questionId: mockQuestionId2, selectedOption: 'D', isCorrect: true, timeToAnswer: 9000 },
          { questionId: mockQuestionId1, selectedOption: 'A', isCorrect: true, timeToAnswer: 10000 }
        ]
      },
      {
        userId,
        dateString: '2026-06-10',
        score: 100,
        xpEarned: 150,
        timeSpent: 42,
        questionsCorrect: 5,
        answers: [
          { questionId: mockQuestionId1, selectedOption: 'A', isCorrect: true, timeToAnswer: 6000 },
          { questionId: mockQuestionId2, selectedOption: 'B', isCorrect: true, timeToAnswer: 7000 },
          { questionId: mockQuestionId1, selectedOption: 'C', isCorrect: true, timeToAnswer: 9000 },
          { questionId: mockQuestionId2, selectedOption: 'D', isCorrect: true, timeToAnswer: 10000 },
          { questionId: mockQuestionId1, selectedOption: 'A', isCorrect: true, timeToAnswer: 10000 }
        ]
      }
    ];

    console.log(`Inserting ${challenges.length} challenge results...`);
    await ChallengeResult.insertMany(challenges);

    // Update user streak and learning preferences
    user.challengeStreak = {
      current: 3,
      longest: 3,
      lastActivityDate: new Date('2026-06-10T12:00:00Z')
    };
    user.learningPreferences = {
      selectedSubjects: [jsSubjectId]
    };
    user.xp = (user.xp || 0) + 420; // Add the XP from seeded challenges
    await user.save();
    console.log('User streak, selected subjects, and XP updated successfully.');

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

seed();
