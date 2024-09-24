import { useEffect, useState } from "react";
import axios from "axios";
import { CourseCard } from "@/components/CourseCard";

interface CoursePanelProps {
  headerOfComponent: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  video_filenames: string[];
}

export default function CoursesPanel({ headerOfComponent}: CoursePanelProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          "http://localhost:4000/api/courses/jam/f/all",
          {
            withCredentials: true,
          }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="mt-8 mx-4">
      <h2 className="text-4xl font-bold mb-4">{headerOfComponent}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            videoCount={course.video_filenames.length}
          />
        ))}
      </div>
    </section>
  );
}
