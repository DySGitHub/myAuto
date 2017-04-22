import { Component, ViewChild, ElementRef, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

 @Pipe({
  name: 'searchPipe',
  pure: false
})
export class searchPipe implements PipeTransform {
  transform(usercar: any[], searchTerm: string): any[] {
      searchTerm = searchTerm.toUpperCase();
      return usercar.filter(item => {
        return usercar.brand.toUpperCase().indexOf(searchTerm) !== -1 
      });
  }
}