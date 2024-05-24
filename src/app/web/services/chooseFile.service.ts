import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChooseFileService {

  private chooseFileSubject = new Subject<string>; // Puedes usar el tipo de dato que necesites
  public alertaFile$ = this.chooseFileSubject.asObservable();

  setAlertasData(data: string) {
    this.chooseFileSubject.next(data);
  }

}
