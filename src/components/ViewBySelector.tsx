
interface ViewBySelectorProps {
    options: string[];
    onSelect: (value: string) => void;
    selected: string;
}

export const ViewBySelector = ({ options, onSelect, selected }:ViewBySelectorProps) => {
    return (
        <div className="flex space-x-4 flex-row items-center flex-wrap my-4">
            <span className={"font-semibold"}>View by:</span>
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onSelect(option)}
                    className={`btn ${selected === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    style={{
                        fontWeight: selected === option ? "bold" : "normal",
                        margin: "0 8px",
                    }}
                >
                    {`${option.charAt(0).toUpperCase() + option.slice(1)}`}
                </button>
            ))}
        </div>
    );
};