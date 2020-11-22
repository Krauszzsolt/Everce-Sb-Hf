import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationDto } from '@src/app/shared/client';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { CaffService } from '../service/caff.service';

@Component({
  selector: 'app-caff-item',
  templateUrl: './caff-item.component.html',
  styleUrls: ['./caff-item.component.scss'],
})
export class CaffItemComponent implements OnInit {
  constructor(private router: Router, private caffService: CaffService, private route: ActivatedRoute) {}
  public animation$: Observable<AnimationDto>;
  public comment: '';
  public API_BASE_URL = environment.API_BASE_URL;

  ngOnInit() {
    const id = (this.route.snapshot.paramMap.get('id') as unknown) as number;
    this.animation$ = this.caffService.get(id);
  }

  addComment() {
    this.caffService.comment((this.route.snapshot.paramMap.get('id') as unknown) as number, `"${this.comment}"`).subscribe(
      (resp) => {
        const id = (this.route.snapshot.paramMap.get('id') as unknown) as number;
        this.animation$ = this.caffService.get(id);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
}
