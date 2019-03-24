import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../category';
import { AuthService } from '../../login/services/auth.service';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.css']
})
export class CategoriesItemComponent implements OnInit {
  @Input() category: Category;
  @Input() isAdmin: boolean;

  constructor(private authService: AuthService) { 
  }

  ngOnInit() {
  }

  onEdit() {
    console.log('Editing this cat', this.category);
  }

  onDelete() {
    if (confirm(`Are you sure you want to delete this category: ${this.category.category}?`)) {
      console.log('Deleting this category: ' + this.category.id);
    }
  }
}