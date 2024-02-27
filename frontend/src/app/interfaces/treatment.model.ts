import { Category } from "./category.model";
import { Company } from "./company.model";

export interface Treatment {

    id: number;

    title: string;
    price: number;
    images: string[];
    descriptionShort: string;
    descriptionLong: string;
    afterCare: string; // cuidados posteriores

    durationInMin: number; // duracion en minutos
    category: Category;
    company: Company;




    // A futuro
    // subCategory: SubCategory;

}
