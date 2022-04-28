import { Component, OnInit, ViewChild } from '@angular/core';
import { TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @ViewChild(MatMenuTrigger , { static : false})
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  actionMapping:IActionMapping = {
    mouse: {
      contextMenu: (tree, node, $event) => {
        $event.preventDefault();
        this.contextMenuPosition.x = $event.clientX + 'px';
        this.contextMenuPosition.y = $event.clientY + 'px';
        this.contextMenu.openMenu();
        alert(`context menu for ${node.data.name}`);
      },
      dblClick: (tree, node, $event) => {
        if (node.hasChildren) {
          TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        }
      },
      click: (tree, node, $event) => {
        $event.shiftKey
          ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
          : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
      }
    },
    keys: {
      [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
    }
  };
  options:any;

  constructor() {
    const actionMapping = this.actionMapping;
    this.options = {
      allowDrag: true,
      actionMapping,
    };
  }

  ngOnInit() {
  }

  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            {
              id: 7,
              name: 'subsub',
              children: [
                { id: 8, name: 'test' }
              ]
            }
          ]
        }
      ]
    }
  ];

  onMoveNode($event) {
   
  }

}
