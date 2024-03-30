import { Component, OnInit, inject, signal } from '@angular/core';
import { UserForm } from './users-table.model';
import { UsersService } from '../../../services/users/users.service';
import { User } from '../../../models/users/User';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements OnInit {
  private userService = inject(UsersService);
  public users = signal<User[]>([]);
  public isShowFormUser = signal(false);
  public isEditUser = signal(false);
  public userSelectedId = signal<string | null>(null);
  public userForm?: UserForm;
  //public userFiltersForm: UserFiltersForm = initUserFiltersForm({});
  public hasFilters = signal(false);

  ngOnInit(): void {
    this.init();
  }
  private init() {
    this.handleInitiateAddUser();
  }
  public async handleInitiateAddUser() {
    try {
      this.users.set(await this.userService.getAllUsers());
    } catch (error) {
      alert('Error loading users');
    }
  }
  public handleDeleteUser(userId: string) {}
  public handleInitiateEditUser(user: User) {}
  public handleSaveUser(userForm: UserForm) {}
}
