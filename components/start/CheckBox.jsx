"use client";
import { Checkbox } from "../../components/ui/checkbox";

export function CheckBox(props) {
  const { title, slug, isChecked, onCheckboxChange } = props;

  const handleCheckboxChange = () => {
    onCheckboxChange(slug);
  };

  return (
    <div className="flex items-center space-x-4 text-gray-600">
      <Checkbox id={slug} onClick={handleCheckboxChange} />
      <label
        htmlFor={slug}
        className="text-sm font-semibold cursor-pointer  hover:text-sky-600 hover:transition-all hover:duration-500  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {title}
      </label>
    </div>
  );
}
