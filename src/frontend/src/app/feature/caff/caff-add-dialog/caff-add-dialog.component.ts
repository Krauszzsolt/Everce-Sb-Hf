import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimationsService } from 'src/app/shared/client';

@Component({
  selector: 'app-caff-add-dialog',
  templateUrl: './caff-add-dialog.component.html',
  styleUrls: ['./caff-add-dialog.component.scss'],
})
export class CaffAddDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CaffAddDialogComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private animationsService: AnimationsService
  ) // private tagsService: TagsService
  {}

  newStoryForm: FormGroup;
  loading = false;
  error = '';

  // tags$: Observable<TagDto[]>;

  url: string | ArrayBuffer = 'https://localhost:44329/images/book-cover-placeholder.png';

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private router: Router,
  //   private editService: EditService,
  //   private tagsService: TagsService
  // ) { }

  ngOnInit(): void {
    // this.tags$ = this.tagsService.tagsGet();

    this.newStoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      tags: [],
      coverImageSource: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newStoryForm.controls;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      const file = event.target.files[0];

      // preview
      var reader = new FileReader();
      reader.readAsDataURL(file); // read file as data url
      // reader.onload = (event) => {
      //   // called once readAsDataURL is completed
      //   this.url = event.target.result;
      // };

      // add to form
      this.newStoryForm.patchValue({
        coverImageSource: file,
      });
    }
  }

  deselect(selected: string): void {
    const index: number = this.f.tags.value.indexOf(selected);
    if (index > -1) {
      const newValue: string[] = this.f.tags.value.map((x) => x);
      newValue.splice(index, 1);
      this.f.tags.setValue(newValue);
    }
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.newStoryForm.invalid) {
      return;
    }

    let tags: string[] = [];
    if (this.f.tags.value) {
      tags = this.f.tags.value.map((x) => x);
    }

    this.loading = true;
    //this.editService.editNewstoryPost({ title: this.f.title.value, description: this.f.description.value, tags: this.f.tags.value.map(x => <TagDto>{ value: x })})
    this.animationsService.animationsAddPost(this.f.title.value, this.f.coverImageSource.value).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }
}
