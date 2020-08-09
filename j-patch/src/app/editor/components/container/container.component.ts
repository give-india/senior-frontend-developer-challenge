import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

import { applyPatch, applyOperation } from 'fast-json-patch';
import { formatters, diff } from 'jsondiffpatch';

import { HelperService } from './../../services/helper.service';
import { BaseObj, PatchObj } from './../../constants/json-patch.mock';

const popupYOffset = 80;
const popupXOffset = 10;
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.less']
})
export class ContainerComponent implements OnInit {

  public baseObj: any = BaseObj;
  public patchObj: any[] = PatchObj;

  // public baseObj: any = null;
  // public patchObj: any[] = null;

  public delta: any = null;

  public editorOptions1: JsonEditorOptions;
  public editorOptions2: JsonEditorOptions;
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

    if (!this.baseObj || !this.patchObj) {
      return;
    }

    const right = applyPatch(this.baseObj, this.patchObj, false, false).newDocument;
    const delta = diff(this.baseObj, right);
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
      this.position.x = e.pageX - popupXOffset;
      this.position.y = e.pageY - popupYOffset;
      this.currentTarget = e.target;
      this.showPopup = true;
    }
  }

  private isLIModified(target): boolean {
    return this.helperService.isLIModified(target);
  }

  public getEditorChange(data, from: 'base' | 'patch') {
    debugger
    if ('base' === from) {
      this.baseObj = data;
    } else {
      this.patchObj = data;
    }
    this.doCompare();
  }

  public onAccept(status: boolean): void {
    const operation = this.helperService.buildPatchOperation(this.currentTarget);
    this.applyOperation(status, operation);
    this.doCompare();
    this.showPopup = false;
  }

  private applyOperation(status: boolean, operation: { op, path }): void {
    let operationIndex = this.patchObj.findIndex(patch => (patch.op === operation.op || 'replace' === patch.op) && patch.path === operation.path);
    console.log(operation);
    console.log('operationIndex:', operationIndex);
    operationIndex = operationIndex === -1 ? 0 : operationIndex;
    if (status) {
      applyOperation(this.baseObj, this.patchObj[operationIndex]).newDocument;
      this.baseObj = Object.assign({}, this.baseObj);
    }

    this.patchObj.splice(operationIndex, 1);
    this.patchObj = Object.assign([], this.patchObj);

  }

}
