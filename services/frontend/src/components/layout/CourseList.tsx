import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css'; 
import { getAllCourses, Course } from '../../api/courses';
import { getCatalogImage } from '../../utils/courseUtils';

export default function CourseList() {
  const navigate = useNavigate();
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Explore Courses | Vormirex';
    const fetchData = async () => {
      try {
        const list = await getAllCourses();
        setCoursesList(list);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="course-loading">Loading...</div>;
  }

  return (
    <div className="course-list-page">
      <div className="course-list-header">
        <h1>Our Courses</h1>
      </div>
      <div className="course-grid">
        {coursesList.map((item) => (
          <div
            key={item._id}
            className="course-card"
            onClick={() => navigate(`/course/${item._id}`)}
          >
            <img
              src={getCatalogImage(item)}
              alt={item.title}
              className="course-card-img"
            />
            <div className="course-card-content">
              <h3>{item.title}</h3>
              <p className="course-card-desc">{item.description}</p>
              <button className="course-card-btn">View Details →</button>
            </div>
          </div>
        ))}
        {coursesList.length === 0 && <p style={{textAlign:'center'}}>No courses found.</p>}
      </div>
    </div>
  );
}
