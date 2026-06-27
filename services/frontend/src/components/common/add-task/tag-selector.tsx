import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type Props = {
  selectedTags: string[];
  quickTags: string[];
  toggleTag: (tag: string) => void;
};

const TagsSelector = ({ selectedTags, quickTags, toggleTag }: Props) => {
  return (
    <div>
      <label className="mb-3 block text-xs uppercase tracking-wider text-textColor">
        Tags
      </label>

      <div className="mb-3 flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag}
            className="rounded-full bg-primary/20 text-primary px-3 py-1"
          >
            {tag}
            <X
              onClick={() => toggleTag(tag)}
              className="ml-2 h-3 w-3 cursor-pointer"
            />
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {quickTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className="rounded-full custom-surface px-3 py-1.5 text-xs hover:bg-primary/10"
          >
            + {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagsSelector;

