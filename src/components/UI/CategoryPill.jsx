import { getCategoryColor } from "../../utils/helpers";

export default function CategoryPill({ category }) {
  if (!category) return null;
  const { bg, text } = getCategoryColor(category);

  return (
    <span 
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap"
      style={{ background: bg, color: text }}
    >
      <span>{category}</span>
    </span>
  );
}
