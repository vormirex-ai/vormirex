import mongoose from 'mongoose';
import SubjectModel, { ISubject } from './subject.model.js';

interface FindAllSubjectsResult {
  subjects: any[];
  total: number;
  page: number;
  limit: number;
}

class SubjectRepository {
  async create(subjectData: Partial<ISubject>): Promise<ISubject> {
    return SubjectModel.create(subjectData);
  }

  async findById(subjectId: string): Promise<ISubject | null> {
    return SubjectModel.findById(subjectId).exec();
  }

  async updateById(
    subjectId: string,
    updateData: Partial<ISubject>
  ): Promise<ISubject | null> {
    return SubjectModel.findByIdAndUpdate(subjectId, updateData, {
      new: true,
    }).exec();
  }

  async deleteById(subjectId: string): Promise<ISubject | null> {
    return SubjectModel.findByIdAndDelete(subjectId).exec();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any> = {}
  ): Promise<{
    subjects: ISubject[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;

    const [subjects, total] = await Promise.all([
      SubjectModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      SubjectModel.countDocuments(filter),
    ]);

    return { subjects, total, page, limit };
  }

  async findAllWithProgress(
    userId: string,
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any> = {}
  ): Promise<FindAllSubjectsResult> {
    const skip = (page - 1) * limit;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Build the aggregation pipeline
    const pipeline: any[] = [
      // 1. Filter subjects
      { $match: filter },

      // 2. Lookup SubjectProgress for this specific user
      {
        $lookup: {
          from: 'subjectprogresses',
          let: { subjectId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$subjectId', '$$subjectId'] },
                    { $eq: ['$userId', userObjectId] },
                  ],
                },
              },
            },
          ],
          as: 'userProgress',
        },
      },

      // 3. Lookup Chapters for the subject
      {
        $lookup: {
          from: 'chapters',
          localField: '_id',
          foreignField: 'subjectId',
          as: 'chapters',
        },
      },

      // 4. Lookup Lessons for those Chapters
      {
        $lookup: {
          from: 'lessons',
          let: { chapterIds: '$chapters._id' },
          pipeline: [
            {
              $match: {
                $expr: { $in: ['$chapterId', '$$chapterIds'] },
              },
            },
          ],
          as: 'lessons',
        },
      },

      // 5. Project required properties
      {
        $project: {
          title: 1,
          subtitle: 1,
          description: 1,
          icon: 1,
          price: 1,
          isPro: 1,
          hasCertificate: 1,
          status: 1,
          tags: 1,
          createdAt: 1,
          updatedAt: 1,
          totalLessons: { $size: '$lessons' },
          lessonsDone: {
            $size: {
              $ifNull: [
                { $arrayElemAt: ['$userProgress.completedLessons', 0] },
                [],
              ],
            },
          },
          totalStudyTimeSeconds: {
            $ifNull: [
              { $arrayElemAt: ['$userProgress.totalStudyTimeSeconds', 0] },
              0,
            ],
          },
          progressPercentage: {
            $cond: {
              if: { $gt: [{ $size: '$lessons' }, 0] },
              then: {
                $round: [
                  {
                    $multiply: [
                      {
                        $divide: [
                          {
                            $size: {
                              $ifNull: [
                                {
                                  $arrayElemAt: [
                                    '$userProgress.completedLessons',
                                    0,
                                  ],
                                },
                                [],
                              ],
                            },
                          },
                          { $size: '$lessons' },
                        ],
                      },
                      100,
                    ],
                  },
                  0,
                ],
              },
              else: 0,
            },
          },
          userStatus: {
            $cond: {
              if: { $eq: [{ $size: '$userProgress' }, 0] },
              then: 'Not Started',
              else: {
                $cond: {
                  if: {
                    $and: [
                      { $gt: [{ $size: '$lessons' }, 0] },
                      {
                        $gte: [
                          {
                            $size: {
                              $ifNull: [
                                {
                                  $arrayElemAt: [
                                    '$userProgress.completedLessons',
                                    0,
                                  ],
                                },
                                [],
                              ],
                            },
                          },
                          { $size: '$lessons' },
                        ],
                      },
                    ],
                  },
                  then: 'Completed',
                  else: 'In Progress',
                },
              },
            },
          },
        },
      },

      // 6. Sort by creation date
      { $sort: { createdAt: -1 } },
    ];

    // For pagination, we execute a count of total matches, and then slice the pipeline
    const countPipeline = [...pipeline];
    countPipeline.push({ $count: 'count' });

    const [facetResults, countResult] = await Promise.all([
      SubjectModel.aggregate(pipeline).skip(skip).limit(limit).exec(),
      SubjectModel.aggregate(countPipeline).exec(),
    ]);

    const total = countResult[0]?.count || 0;

    return { subjects: facetResults, total, page, limit };
  }
}

export default new SubjectRepository();
