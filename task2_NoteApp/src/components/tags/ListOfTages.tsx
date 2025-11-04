import { Tage } from "./Tage";
const titles: Array<string> = [
  "Cooking",
  "Dev",
  "Fitness",
  "Health",
  "Personal",
  "React",
  "Shopping",
  "Travel",
  "TypeScript",
];

export const ListOfTages = () => {
  return (
    <div className="space-y-2">
      
     {window.innerWidth > 1280 && <h3 className="text-sm font-medium text-(--color-text-2) pl-1.5 mb-4">Tags</h3>}
      {titles.map((item) => {
        return <Tage key={item} title={item} />;
      })}
    </div>
  );
};
