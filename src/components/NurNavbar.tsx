import AnimatedBackground from "@/components/core/animated-background";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export default function NurNavbar() {
  const TABS = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const navigate = useNavigate();

  return (
    <div className="fixed top-0 inset-x-0 dark:bg-black bg-zinc-50 light:text-black dark:text-white border-b border-zinc-600 border-opacity-60 z-[10] h-14">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between">
          <div className="flex flex-row gap-2 justify-center items-center">
            <AnimatedBackground
              defaultValue={TABS[0].name}
              className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }}
              enableHover
            >
              {TABS.map((tab, index) => (
                <button
                  key={index}
                  data-id={tab.name}
                  type="button"
                  className="px-2 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  onClick={() => navigate(tab.path)}
                >
                  {tab.name}
                </button>
              ))}
            </AnimatedBackground>
          </div>
          <ModeToggle />
        </div>
      </div>
  );
}
