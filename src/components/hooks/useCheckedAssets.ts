import {useState} from "react";

export const useCheckedAssets = () => {
    const [checkedAssets, setCheckedAssets] = useState<string[]>([]);

    const toggleCheckedAsset = (id: string) => {
        setCheckedAssets((prev) =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return { checkedAssets, toggleCheckedAsset };
};