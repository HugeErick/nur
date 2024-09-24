import CoursesPanel from "@/components/panels/CoursesPanel";

export default function HomePage() {
  const welcomingMsg = "Welcome back";
  return (
    <div className="mt-24 mx-4">
      <h1 className="text-6xl mx-4 my-4 font-bold">{welcomingMsg}</h1>
      <CoursesPanel headerOfComponent="Courses for you" />
    </div>
  );
}
