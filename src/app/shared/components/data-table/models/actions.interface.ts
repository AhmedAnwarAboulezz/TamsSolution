export interface ActionsInterface {
  name?: string;
  color?: string;
  icon?: string;
  permission?: string;
  isDelete?: boolean;
  isBlock?: boolean;
  isEdit?: boolean;
  isView?: boolean;
  call?: (row?: {}) => any;
}

export interface ActionListInterface extends Array<ActionsInterface> {}
