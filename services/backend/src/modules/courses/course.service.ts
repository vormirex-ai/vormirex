import courseRepository from './course.repository.js';
import { CreateCourseInput } from './course.validation.js';
import { ICourse } from './course.model.js';

class CourseService {
  async create(courseData: CreateCourseInput) {
    return courseRepository.create(courseData as any);
  }

  async getById(courseId: string) {
    const course = await courseRepository.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }

  async getAll(page: number, limit: number, filter: Record<string, any>) {
    return courseRepository.findAll(page, limit, filter);
  }

  async update(courseId: string, updateData: Partial<ICourse>) {
    const course = await courseRepository.updateById(courseId, updateData);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }

  async remove(courseId: string) {
    const course = await courseRepository.deleteById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    return { message: 'Course deleted successfully' };
  }
}

export default new CourseService();
