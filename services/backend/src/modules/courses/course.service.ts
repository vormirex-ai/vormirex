import courseRepository from './course.repository.js';
import { CreateCourseInput } from './course.validation.js';
import { ICourse } from './course.model.js';
import { NotFoundError } from '../../utils/errors.js';

class CourseService {
  async create(courseData: CreateCourseInput) {
    // Auto-seed default curriculum structure if not provided
    if (!courseData.levels || courseData.levels.length === 0) {
      // We cast to any because Validation might be stricter/looser, but Model allows these enums
      courseData.levels = [
        {
          level: 'FOUNDATION',
          highlights: [],
          modules: [],
        },
        {
          level: 'ADVANCED',
          highlights: [],
          modules: [],
        },
      ] as any;
    }
    return courseRepository.create(courseData as any);
  }

  async getById(courseId: string) {
    const course = await courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    return course;
  }

  async getAll(page: number, limit: number, filter: Record<string, any>) {
    return courseRepository.findAll(page, limit, filter);
  }

  async update(courseId: string, updateData: Partial<ICourse>) {
    const course = await courseRepository.updateById(courseId, updateData);
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    return course;
  }

  async remove(courseId: string) {
    const course = await courseRepository.deleteById(courseId);
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    return { message: 'Course deleted successfully' };
  }

  async addModule(courseId: string, levelId: string, moduleData: { title: string; items?: string[] }) {
    const course = await courseRepository.findById(courseId);
    if (!course) throw new NotFoundError('Course not found');

    // Find the specific level sub-document
    const levelBlock = course.levels.find((l: any) => l._id.toString() === levelId);
    if (!levelBlock) throw new NotFoundError('Course Level not found');

    // Add module to that level
    levelBlock.modules.push(moduleData as any);
    await course.save();
    
    return course;
  }
}

export default new CourseService();
