import { getCategoryColor } from "../../utils/helpers";

export default function CategoryPill({ category }) {
  if (!category) return null;
  const { bg, text } = getCategoryColor(category);
  
  return (
    <span 
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium max-w-[80px] sm:max-w-[120px]"
      style={{ background: bg, color: text }}
    >
      <span className="truncate">{category}</span>
    </span>
  );
}
