export interface FoodItem {
    id: string;
    description: string;
}

export interface Nutrient {
    label: string;
    value: number | null;
    unit: string;
}

export interface FoodDetail {
    id: string;
    description: string;
    category: {
        id: string;
        name: string;
    };
    nutrients: Nutrient[];
}
