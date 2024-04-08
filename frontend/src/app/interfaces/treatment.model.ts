import { Category } from "./category.model";
import { Company } from "./company.model";

export interface Treatment {

    id: number;
    title: string;
    price: number;
    image: string;
    descriptionShort: string;
    descriptionLong: string;
    afterCare: string; // cuidados posteriores
    durationInMin: number; // duracion en minutos
    categories?: Category;
    company?: Company;




    // A futuro
    // subCategory: SubCategory;

}
