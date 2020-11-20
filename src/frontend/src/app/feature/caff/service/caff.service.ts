import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimationDto, AnimationsService, CommentDto } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class CaffService {
  constructor(private animationsService: AnimationsService) {}

  public get(id: number): Observable<AnimationDto> {
    return this.animationsService.animationsIdGet(id);
  }
  public getAll(searchTerm?: string): Observable<AnimationDto[]> {
    return this.animationsService.animationsGet(searchTerm);
  }
  public add(title?: string, animationFile?: Blob): Observable<AnimationDto> {
    return this.animationsService.animationsAddPost(title, animationFile);
  }
  public modify(id: number, body?: string): Observable<AnimationDto> {
    return this.animationsService.animationsIdEditPost(id, body);
  }
  public delete(id: number): Observable<any> {
    return this.animationsService.animationsIdDeletePost(id);
  }
  public comment(id: number, body?: string): Observable<CommentDto> {
    return this.animationsService.animationsIdCommentPost(id, body);
  }
}
