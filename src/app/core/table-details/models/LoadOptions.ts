export class LoadOptions {
  limit: number = 0;
  offset: number = 0;
  searchCriteria?: string = ''
  sortField: string = "id";
  sortDirection: string = "ascending";
  filter: any = {};
}