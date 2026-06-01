class SupabaseModel {
  constructor(table) {
    this.table = table;
    this.url = SUPABASE_URL;
    this.headers = dbHeaders;
  }

  buildFilter(filter) {
    return Object.keys(filter)
      .map(k => `${k}=eq.${filter[k]}`)
      .join("&");
  }

  getAll(options = {}, callback) {
    let url = `${this.url}/rest/v1/${this.table}?select=*`;

    if (options.filter)
      url += "&" + this.buildFilter(options.filter);

    if (options.orderBy)
      url += `&order=${options.orderBy.column}.${options.orderBy.direction || "asc"}`;

    if (options.limit !== undefined)
      url += `&limit=${options.limit}`;

    if (options.offset !== undefined)
      url += `&offset=${options.offset}`;

    $.ajax({
      url,
      method: "GET",
      headers: this.headers,
      success: callback
    });
  }

  save(data, callback) {
    $.ajax({
      url: `${this.url}/rest/v1/${this.table}`,
      method: "POST",
      headers: this.headers,
      data: JSON.stringify(data),
      success: callback
    });
  }

  bulkSave(dataArray, callback) {
    $.ajax({
      url: `${this.url}/rest/v1/${this.table}`,
      method: "POST",
      headers: this.headers,
      data: JSON.stringify(dataArray),
      success: callback
    });
  }

  updateBy(filter, data, callback) {
    const q = this.buildFilter(filter);

    $.ajax({
      url: `${this.url}/rest/v1/${this.table}?${q}`,
      method: "PATCH",
      headers: this.headers,
      data: JSON.stringify(data),
      success: callback
    });
  }

  deleteBy(filter, callback) {
    const q = this.buildFilter(filter);

    $.ajax({
      url: `${this.url}/rest/v1/${this.table}?${q}`,
      method: "DELETE",
      headers: this.headers,
      success: callback
    });
  }
}
