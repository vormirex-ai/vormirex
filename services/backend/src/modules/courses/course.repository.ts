import CourseModel, { ICourse } from './course.model.js';

interface FindAllCoursesResult {
  courses: ICourse[];
  total: number;
  page: number;
  limit: number;
}

class CourseRepository {
  async create(courseData: Partial<ICourse>): Promise<ICourse> {
    return CourseModel.create(courseData);
  }

  async findById(courseId: string): Promise<ICourse | null> {
    return CourseModel.findById(courseId)
      .populate('instructorId', 'name email avatar')
      .exec();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filter: Record<string, any> = {}
  ): Promise<FindAllCoursesResult> {
    const skip = (page - 1) * limit;

    const [courses, total] = await Promise.all([
      CourseModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('instructorId', 'name avatar')
        .exec(),
      CourseModel.countDocuments(filter),
    ]);

    return { courses, total, page, limit };
  }

  async updateById(
    courseId: string,
    updateData: Partial<ICourse>
  ): Promise<ICourse | null> {
    return CourseModel.findByIdAndUpdate(courseId, updateData, { new: true });
  }

  async deleteById(courseId: string): Promise<ICourse | null> {
    return CourseModel.findByIdAndDelete(courseId);
  }
}

export default new CourseRepository();
