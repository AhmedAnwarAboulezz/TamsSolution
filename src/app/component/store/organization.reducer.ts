import { Organization } from "src/app/models/Organization";
import { createReducer, on } from '@ngrx/store';
import { retrievedOrganization } from "./organization.action";


export const initialState: ReadonlyArray<Organization> = [];

const _organizationReducer = createReducer(
  initialState,
  on(retrievedOrganization, (state, { org }) => {
    return [org];
  })
);

export function organizationReducer(state: any, action: any) {
  return _organizationReducer(state, action);
}