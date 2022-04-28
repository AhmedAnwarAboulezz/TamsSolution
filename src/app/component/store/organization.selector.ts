import { createSelector } from "@ngrx/store";
import { Organization } from "src/app/models/Organization";
import { AppState } from "./AppState";


export const organizationSelector =(state: AppState) => state.organizationdata;


export const getorganization = () => createSelector(
    organizationSelector,
    (organization:Organization) => { 
        return organization;
    })
