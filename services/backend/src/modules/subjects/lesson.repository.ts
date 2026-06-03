import LessonModel, { ILesson } from './lesson.model.js';

class LessonRepository {
  async create(lessonData: Partial<ILesson>): Promise<ILesson> {
    return LessonModel.create(lessonData);
  }

  async findById(lessonId: string): Promise<ILesson | null> {
    return LessonModel.findById(lessonId).exec();
  }

  async findByIdWithSubject(lessonId: string): Promise<any | null> {
    return LessonModel.findById(lessonId)
      .populate({
        path: 'chapterId',
        select: 'subjectId title sequenceOrder',
      })
      .exec();
  }

  async updateById(
    lessonId: string,
    updateData: Partial<ILesson>
  ): Promise<ILesson | null> {
    return LessonModel.findByIdAndUpdate(lessonId, updateData, {
      new: true,
    }).exec();
  }

  async deleteById(lessonId: string): Promise<ILesson | null> {
    return LessonModel.findByIdAndDelete(lessonId).exec();
  }
}

export default new LessonRepository();
