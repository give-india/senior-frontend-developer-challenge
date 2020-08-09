import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

import { applyPatch, applyOperation } from 'fast-json-patch';
import { formatters, diff } from 'jsondiffpatch';

import { HelperService } from './../../services/helper.service';
import { BaseObj, PatchObj } from './../../constants/json-patch.mock';

const popupOffset = 100;
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.less']
})
export class ContainerComponent implements OnInit {

  public baseObj: any = BaseObj;
  public patchObj: any[] = PatchObj;

  public delta: any;

  public editorOptions1: JsonEditorOptions;
  public editorOptions2: JsonEditorOptions;
  public data: any;
  public showPopup = false;
  private currentTarget;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  @ViewChild('deltaSection') deltaSection: ElementRef;
  public position: { x: number, y: number } = { x: 0, y: 0 };


  constructor(
    private elementRef: ElementRef,
    private helperService: HelperService
  ) {
    this.initJsonEditor();
    this.initJsonEditorSecond();
  }

  ngOnInit() {
    this.doCompare();
  }

  private initJsonEditor(): void {
    this.editorOptions1 = new JsonEditorOptions()
    this.editorOptions1.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    this.editorOptions1.mode = 'code'; //set only one mode
  }

  private initJsonEditorSecond(): void {
    this.editorOptions2 = new JsonEditorOptions()
    this.editorOptions2.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    this.editorOptions2.mode = 'code'; //set only one mode
  }

  private doCompare() {

    const right = applyPatch(this.baseObj, this.patchObj, false, false).newDocument;
    const delta = diff(this.baseObj, right);
    // console.log(delta);
    this.delta = formatters.html.format(delta, this.baseObj);

    setTimeout(() => {
      this.attachEvent();
    }, 0);

  }

  private attachEvent() {
    this.deltaSection.nativeElement.addEventListener('mouseover', this.onMouseOver.bind(this));
  }

  public onMouseOver(e) {
    this.showPopup = false;
    let li = e.target.closest('li');
    if (!li) return;

    if (e.target && this.isLIModified(e.target)) {
      this.position.x = e.pageX;
      this.position.y = e.pageY - popupOffset;
      this.currentTarget = e.target;
      this.showPopup = true;
    }
  }

  private isLIModified(target): boolean {
    return this.helperService.isLIModified(target);
  }

  public getEditorChange(data, from: 'base' | 'patch') {
    // if ('base' === from) {
    //   this.baseObj = data;
    // } else {
    //   this.patchObj = data;
    // }
    // this.doCompare();
  }

  public onAccept(status: boolean): void {
    const operation = this.helperService.buildPatchOperation(this.currentTarget);
    this.applyOperation(status, operation);
    this.doCompare();
    this.showPopup = false;
  }

  private applyOperation(status: boolean, operation: { op, path }): void {
    const operationIndex = this.patchObj.findIndex(patch => (patch.op === operation.op || 'replace' === patch.op) && patch.path === operation.path);
    console.log(operation);
    console.log('operationIndex:', operationIndex);
    if (status && operationIndex !== -1) {
      applyOperation(this.baseObj, this.patchObj[operationIndex]).newDocument;
      this.baseObj = Object.assign({}, this.baseObj);
    }
    if (operationIndex !== -1) {
      this.patchObj.splice(operationIndex, 1);
      this.patchObj = Object.assign([], this.patchObj);
    }
  }

}
