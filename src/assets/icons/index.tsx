export const CategoryIcon: React.FC<{ category: string | null }> = ({
    category,
}) => {
    let colorIcon = () => {
        switch (category) {
            case "FRESH":
                return "#afd0cb";

            case "FRUITY":
                return "#f5b8a0";
            case "FOOD + SPICE":
                return "#eddc9f";
            case "FLORAL":
                return "#d5b2cb";
        }
    };
    return (
        <div
            className="badge rounded-pill  text-dark border border-dark "
            style={{ backgroundColor: colorIcon() }}
        >
            {category}
        </div>
    );
};
