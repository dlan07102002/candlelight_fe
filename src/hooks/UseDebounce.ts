import { useEffect, useState } from "react";

const UseDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Hủy bỏ timeout nếu `value` thay đổi trước khi timeout hoàn thành
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default UseDebounce;
