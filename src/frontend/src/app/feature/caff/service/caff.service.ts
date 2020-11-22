import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, shareReplay } from 'rxjs/operators';
import { AnimationDto, AnimationsService, CommentDto } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class CaffService {
  constructor(private animationsService: AnimationsService) {
    this.searchTrem = new BehaviorSubject<string>('');
  }

  private searchTrem: BehaviorSubject<string>;

  public setSearchTerm(searchTrem) {
    this.searchTrem.next(searchTrem);
  }

  public getSearchTerm(): Observable<string> {
    return this.searchTrem.asObservable().pipe(debounceTime(500));
  }

  public get(id: number): Observable<AnimationDto> {
    return this.animationsService.animationsIdGet(id).pipe(shareReplay(1));
  }
  public getAll(): Observable<AnimationDto[]> {
    return this.animationsService.animationsGet(this.searchTrem.value);
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

  public download(id: number) {
    return this.animationsService.animationsIdDownloadGet(id);
  }
}
