import { HiOutlineTag } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ROUTES } from "../../router/routes";
import { useNotifications } from "../../hooks/useNotifications";
export const Tage = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess } = useNotifications();
  const params = new URLSearchParams(location.search);
  const existingTags = params.getAll("tag");
  const isActive = existingTags.includes(title);

  const handleClick = () => {
    const isTaggedPage = location.pathname.includes(ROUTES.TAGGED_NOTE);
    const params = new URLSearchParams(location.search);
    const tags = params.getAll("tag");
  
    if (!isTaggedPage) {
      navigate(`${ROUTES.TAGGED_NOTE}?tag=${title}`, { replace: true });
      showSuccess(`Showing notes tagged: ${title}`);
      return;
    }
  
    const hasTag = tags.includes(title);
    // If the current tag is the same as the tag we clicked on, go back to AllNote
    if (tags.length === 1 && hasTag) {
      navigate(ROUTES.AllNOTE, { replace: true });
      showSuccess("Showing all notes");
      return;
    }
    // If the tag is not the same as the tag we clicked on, add or remove the tag
    hasTag
      ? (params.delete("tag", title), showSuccess(`Removed tag: ${title}`))
      : (params.append("tag", title), showSuccess(`Added tag: ${title}`));
  
    navigate(`${ROUTES.TAGGED_NOTE}?${params.toString()}`, { replace: true });
  };


  return (
    <div
      className={`flex items-center px-4 py-2 m-2 rounded-md cursor-pointer relative
        ${
          isActive
            ? "bg-(--color-accent) text-(--color-text)"
            : "text-(--color-text) hover:bg-(--color-accent) hover:text-(--color-text)"
        }`}
      onClick={handleClick}
    > 
      <HiOutlineTag className="inline-block w-5 h-5 mr-2" />

      {title}
      {isActive && (
        <span className="text-(--color-text)">
          <MdOutlineKeyboardArrowRight className="absolute right-3 top-2.5 w-6 h-6" />
        </span>
      )}
    </div>
  );
};
