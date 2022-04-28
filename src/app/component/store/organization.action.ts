import { Organization } from "src/app/models/Organization";
import { createAction, props } from '@ngrx/store';

export const retrievedOrganization = createAction("Org API Success", props<{org:Organization}>());