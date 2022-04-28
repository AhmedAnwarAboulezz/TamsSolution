import { Component, OnInit, Input, Output, EventEmitter, forwardRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { TreeService } from '../../services/tree.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from 'src/app/component/shell';

@Component({
  selector: 'app-prime-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeComponent),
      multi: true
    }
  ]
})
export class TreeComponent implements OnInit, ControlValueAccessor, AfterContentInit {
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }

  loading: boolean;
  nodes: TreeNode[] = [];
  bindedNodes: TreeNode[] = [];
  bindedNode: TreeNode = {};
  selectedNodes: TreeNode[] = [];
  selectionType;

  @Input() privateValue: any;
  @Input() data: any[];
  @Input() selectionMode: string;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();
  @Input() showAll: any;

  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this.privateValue;
  }

  set value(val) {
    this.privateValue = val;
    if (this.selectionType != 'checkbox') {
      let assembledNodes: TreeNode[] = [];
      this.setSelectedNodes(this.assembleAllNodes(this.nodes, assembledNodes), this.privateValue);
    }
    if (this.selectionType == 'checkbox') {
      let assembledNodes: TreeNode[] = [];
      this.setSelectedNodes(this.assembleAllNodes(this.nodes, assembledNodes), this.privateValue);
    }
    this.onChange(val);
    this.onTouched();
  }
  constructor(private treeService: TreeService, public storageService: StorageService) {
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.setSelectionMode();
    let data = [];
    if (this.privateValue != null) {
      if (Array.isArray(this.privateValue)) {
        data = [...this.privateValue];
      } else {
        data.push(this.privateValue);
      }

    }
    this.loadData(data);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value === null) {
      this.selectedNodes = [];
    } else {
      this.value = value;
    }
    this.onChange(value);
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setSelectionMode() {
    this.selectionType = this.selectionMode;
  }
  loadData(id: any, reset?: boolean) {
    this.getDataFromServer(id, reset);
  }

  /*  Get Initital  Nodes */
  getDataFromServer(id: any, reset?: boolean) {
    let showAll = this.showAll;
    this.loading = true;
    if (showAll === true) {
      this.treeService.loadfulltree().subscribe(result => {
        this.storageService.removeStorgeByKey('TheTree');
        this.nodes = result;
        this.excute(reset);
        this.loading = false;
      });
    } else {
      if (this.storageService.isExist('TheTree')) {
        this.nodes = JSON.parse(this.treeService.getTreeNodes());
        this.excute(reset);
        this.loading = false;
      } else {
        this.treeService.loadtree().subscribe(result => {
          this.storageService.setItem('TheTree', JSON.stringify(result));
          this.nodes = result;
          this.excute(reset);
          this.loading = false;
        });
      }
    }

  }
  excute(reset) {
    let assembledNodes: TreeNode[] = [];
    this.assembleAllNodes(this.nodes, assembledNodes);
    if (!reset) {
      this.setSelectedNodes(assembledNodes, this.privateValue);
    }
    if (reset && this.selectionType == 'checkbox') {
      this.bindedNodes = [];
      this.selectedNodes = [];
      this.writeValue(this.selectedNodes);
    }
  }
  /* Assemble All Nodes*/
  assembleAllNodes(nodes?: TreeNode[], assembledNodes?: TreeNode[]): TreeNode[] {
    nodes.forEach(n => {
      assembledNodes.push(n);
      if (n.children) {
        this.assembleAllNodes(n.children, assembledNodes);
      }
    });
    return assembledNodes;
  }

  /* Set Selected Nodes */
  setSelectedNodes(nodes?: TreeNode[], node?: string) {
    if (nodes) {
      if (this.selectionType == 'checkbox') {
        if (this.privateValue != null) {
          this.privateValue.forEach(element => {
            let item = nodes.find(x => x.data == element);
            if (item) {
              this.bindedNodes.push(item);
            }

          });
        }
      }
      if (this.selectionType != 'checkbox') {
        let item = nodes.filter(x => x.data == node)[0];
        this.bindedNode = item;
      }

    }
  }

  /*  add selected nodes to list */
  addNode(node?: TreeNode): void {
    switch (this.selectionType) {
      case this.selectionType = 'single':
        {
          this.selected.emit(node.data);
          this.writeValue(node.data);
          return;
        }
      case this.selectionType = 'checkbox':
        {
          this.selectedNodes = [...this.bindedNodes];
          this.writeValue(this.selectedNodes);
          return;
        }
    }
  }

  /*  Remove Node From List*/
  removeNode() {
    this.selectedNodes = [];
    this.selectedNodes = [...this.bindedNodes];
    this.writeValue(this.selectedNodes);
  }

  public validate(c: FormControl) {
    // Business logic. If no error, return null, if not :
    return { required: true };
  }
  selectAll() {
    if (this.selectionType == 'checkbox') {
      this.selectedNodes = [];
      this.nodes.forEach(node => {
        this.recursive(node, true);
      });
    }
  }
  private recursive(node: TreeNode, isExpand: boolean) {
    this.selectedNodes.push(node);
    if (node.children) {
      node.children.forEach(childNode => {
        this.recursive(childNode, isExpand);
      });
    }
  }
}
