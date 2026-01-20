export const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/courses` : 'http://localhost/api/courses';

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  status: 'DRAFT' | 'PUBLISHED';
  isHidden: boolean; // New field
  instructor: string;
  createdAt: string;
}

export interface CreateCourseData {
  title: string;
  description: string;
  price: number;
}

export const getAllCourses = async (token?: string): Promise<Course[]> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  const data = await response.json();
  return data.courses; // Assuming backend returns { courses: [...] }
};

export const getCourseById = async (id: string, token?: string): Promise<Course> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch course');
  }

  const data = await response.json();
  return data.course;
};

// Admin Only
export const createCourse = async (courseData: CreateCourseData, token: string): Promise<Course> => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    throw new Error('Failed to create course');
  }

  const data = await response.json();
  return data.course;
};

// Admin Only
export const updateCourse = async (id: string, courseData: Partial<CreateCourseData>, token: string): Promise<Course> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    throw new Error('Failed to update course');
  }

  const data = await response.json();
  return data.course;
};

// Admin Only
export const deleteCourse = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete course');
  }
};

// Admin Only - New Feature
export const toggleCourseVisibility = async (id: string, token: string): Promise<Course> => {
  const response = await fetch(`${BASE_URL}/${id}/visibility`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to toggle visibility');
  }

  const data = await response.json();
  return data.course;
};
