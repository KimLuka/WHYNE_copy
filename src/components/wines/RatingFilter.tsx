export default function RatingFilter() {
  return (
    <div className="flex flex-col gap-[1.6rem] w-auto">
      <h3 className="font-bold text-[1.8rem] text-gray-800">RATING</h3>
      <form>
        <div className="flex flex-col gap-[1.2rem]">
          {[
            { id: "all", label: "전체" },
            { id: "highest", label: "4.5 - 5.0" },
            { id: "muchHigher", label: "4.0 - 4.5" },
            { id: "higher", label: "3.5 - 4.0" },
            { id: "littleHigher", label: "3.0 - 3.5" },
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center gap-[1.2rem]">
              <input
                type="checkbox"
                id={id}
                name="rating"
                className="appearance-none checked:bg-primary checked:rounded-[0.4rem] w-[2rem] h-[2rem] rounded-[0.6rem] border-solid border-[0.1rem] border-gray-300 bg-gray-100 cursor-pointer"
              />
              <label htmlFor={id}>
                <span className="font-medium text-[1.6rem] text-gray-800">
                  {label}
                </span>
              </label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
