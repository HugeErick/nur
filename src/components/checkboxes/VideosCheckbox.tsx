import { Checkbox } from "@/components/ui/checkbox";

interface VideosCheckboxProps {
  onSelectAll: () => void;
  onDeselectAll: () => void;
  allSelected: boolean;
}

export default function VideosCheckbox({
  onSelectAll,
  onDeselectAll,
  allSelected,
}: VideosCheckboxProps) {
  const handleChange = (checked: boolean) => {
    if (checked) {
      onSelectAll();
    } else {
      onDeselectAll();
    }
  };

  return (
    <div className="flex items-center space-x-2 mx-2">
      <Checkbox
        id="vidselect"
        className="w-[24px] h-[24px] mt-1 self-center"
        checked={allSelected}
        onCheckedChange={handleChange}
      />
      <label
        htmlFor="vidselect"
        className="text-sm font-medium leading-none mt-1"
      >
        {allSelected ? "Deselect all" : "Select all"}
      </label>
    </div>
  );
}
