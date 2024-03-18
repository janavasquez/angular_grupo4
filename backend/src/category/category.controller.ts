import { Controller } from '@nestjs/common';
import { Category } from './category.model';

@Controller('category')

export class CategoryController {
    constructor(
        @InjectRepository(Category) private categoryRepository<Category>
    ){}
    @get()
         FindAll {
            return this.CategoryRepository.find();
         }    

}
