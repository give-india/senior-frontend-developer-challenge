import { Injectable } from '@angular/core';

const liCss = ['jsondiffpatch-modified', 'jsondiffpatch-added', 'jsondiffpatch-moved'];
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public buildPatchOperation(currentTarget) {
    let op: string;
    let li = currentTarget.closest('li');

    switch (li.className) {
      case 'jsondiffpatch-modified':
        op = 'replace';
        break;
      case 'jsondiffpatch-added':
        op = 'add';
        break;
      case 'jsondiffpatch-moved':
        op = 'replace';
        break;
    }

    const path = this.buildPath(currentTarget);

    return {
      op,
      path
    };

  }

  private buildPath(currentTarget): string {

    let className = currentTarget.className;
    let path: string[] = [];

    while (className !== 'delta') {
      //traverse back
      if (currentTarget.childElementCount > 0 && (currentTarget.childNodes[0].className === 'jsondiffpatch-property-name')) {
        path.push(currentTarget.childNodes[0].textContent);
      }
      currentTarget = currentTarget.parentElement;
      className = currentTarget.className;

    };

    return '/' + path.reverse().join('/');
  }

  public isLIModified(target): boolean {
    let currentTarget = target;
    let className = currentTarget.className;

    while (className !== 'delta') {

      if (liCss.includes(className)) {
        return true;
      }

      currentTarget = currentTarget.parentElement;
      className = currentTarget.className;
    };

    return false;
  }

}
