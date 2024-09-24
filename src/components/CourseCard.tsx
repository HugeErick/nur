import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  videoCount: number;
}

export function CourseCard({
  id,
  title,
  description,
  videoCount,
}: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {videoCount} video{videoCount !== 1 ? "s" : ""}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate(`/course/${id}`)}>View Course</Button>
      </CardFooter>
    </Card>
  );
}
