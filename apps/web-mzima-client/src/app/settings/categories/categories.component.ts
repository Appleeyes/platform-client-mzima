import { Component, QueryList, ViewChildren } from '@angular/core';
import { CategoryItemComponent } from './category-item/category-item.component';
import { CategoriesService, CategoryInterface } from '@mzima-client/sdk';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @ViewChildren('categoryItem') categoryItems: QueryList<CategoryItemComponent>;
  public categories: CategoryInterface[];

  constructor(private categoriesService: CategoriesService) {
    this.getCategories();
  }

  public getCategories(): void {
    this.categoriesService.get().subscribe({
      next: (data) => {
        this.categories = data.results;
      },
    });
  }

  public getChildCategories(id: number): CategoryInterface[] {
    return this.categories.filter((category) => category.parent_id === id);
  }
}