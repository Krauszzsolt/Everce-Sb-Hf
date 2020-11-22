import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading: BehaviorSubject<boolean>;

  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  public get isLoadingValue(): boolean {
    return this.isLoading.value;
  }

  public getisLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
  public setisLoading(isLoading) {
    return this.isLoading.next(isLoading);
  }
}
