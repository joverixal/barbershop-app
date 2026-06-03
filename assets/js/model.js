class SupabaseModel {
  constructor(table) {
    this.table = table;
    this.url = SUPABASE_URL;
    this.headers = dbHeaders;
  }

  // 🧠 SAFE ARG HANDLER
  resolveArgs(options, callback) {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    return { options, callback };
  }

  // 🔧 CASE-SAFE FILTER BUILDER
  buildFilter(filter, options = {}) {
    const caseSensitive = options.caseSensitive ?? false;

    return Object.keys(filter)
      .map(k => {
        let value = filter[k];

        if (typeof value === "string") {
          value = value.trim();

          // 🔡 CASE INSENSITIVE MODE
          if (!caseSensitive) {
            return `${k}=ilike.${value}`;
          }

          // 🔤 CASE SENSITIVE MODE
          return `${k}=eq.${value}`;
        }

        return `${k}=eq.${value}`;
      })
      .join("&");
  }

  // 📄 GET ALL
  getAll(options = {}, callback) {
    ({ options, callback } = this.resolveArgs(options, callback));

    let url = `${this.url}/rest/v1/${this.table}?select=*`;

    if (options.orderBy)
      url += `&order=${options.orderBy.column}.${options.orderBy.direction || "asc"}`;

    if (options.limit !== undefined)
      url += `&limit=${options.limit}`;

    $.ajax({
      url,
      method: "GET",
      headers: this.headers,
      success: (data) => {

        if (options.lambda) {
          data = data.filter(options.lambda);
        }

        if (typeof callback === "function") {
          callback(data);
        }

      },
      error: err => console.log(err.responseText)
    });
  }

  // 🔎 GET ALL BY
  getAllBy(filter, options = {}, callback) {
    ({ options, callback } = this.resolveArgs(options, callback));

    let url = `${this.url}/rest/v1/${this.table}?select=*`;

    const query = this.buildFilter(filter, options);
    if (query) url += "&" + query;

    if (options.orderBy)
      url += `&order=${options.orderBy.column}.${options.orderBy.direction || "asc"}`;

    if (options.limit !== undefined)
      url += `&limit=${options.limit}`;

    $.ajax({
      url,
      method: "GET",
      headers: this.headers,
      success: (data) => {

        if (options.lambda) {
          data = data.filter(options.lambda);
        }

        if (typeof callback === "function") {
          callback(data);
        }

      },
      error: err => console.log(err.responseText)
    });
  }

  // ➕ SAVE
  save(data, callback) {
    $.ajax({
      url: `${this.url}/rest/v1/${this.table}`,
      method: "POST",
      headers: this.headers,
      data: JSON.stringify(data),
      success: res => typeof callback === "function" && callback(res),
      error: err => console.log(err.responseText)
    });
  }

  // 📦 BULK SAVE
  bulkSave(dataArray, callback) {
    $.ajax({
      url: `${this.url}/rest/v1/${this.table}`,
      method: "POST",
      headers: this.headers,
      data: JSON.stringify(dataArray),
      success: res => typeof callback === "function" && callback(res),
      error: err => console.log(err.responseText)
    });
  }

  // ✏️ UPDATE BY
  updateBy(filter, data, options = {}, callback) {
    ({ options, callback } = this.resolveArgs(options, callback));

    const q = this.buildFilter(filter, options);

    $.ajax({
      url: `${this.url}/rest/v1/${this.table}?${q}`,
      method: "PATCH",
      headers: this.headers,
      data: JSON.stringify(data),
      success: res => typeof callback === "function" && callback(res),
      error: err => console.log(err.responseText)
    });
  }

  // 🗑️ DELETE BY
  deleteBy(filter, options = {}, callback) {
    ({ options, callback } = this.resolveArgs(options, callback));

    const q = this.buildFilter(filter, options);

    $.ajax({
      url: `${this.url}/rest/v1/${this.table}?${q}`,
      method: "DELETE",
      headers: this.headers,
      success: res => typeof callback === "function" && callback(res),
      error: err => console.log(err.responseText)
    });
  }

  // 📦 BULK UPDATE
  bulkUpdate(filter, data, options = {}, callback) {
    ({ options, callback } = this.resolveArgs(options, callback));

    const q = this.buildFilter(filter, options);

    $.ajax({
      url: `${this.url}/rest/v1/${this.table}?${q}`,
      method: "PATCH",
      headers: this.headers,
      data: JSON.stringify(data),
      success: res => typeof callback === "function" && callback(res),
      error: err => console.log(err.responseText)
    });
  }

  // 🗑️ BULK DELETE
  bulkDelete(filter, options = {}, callback) {
    ({ options, callback } = this.resolveArgs(options, callback));

    const q = this.buildFilter(filter, options);

    $.ajax({
      url: `${this.url}/rest/v1/${this.table}?${q}`,
      method: "DELETE",
      headers: this.headers,
      success: res => typeof callback === "function" && callback(res),
      error: err => console.log(err.responseText)
    });
  }

  // 🧠 CHECK (LOGIN / EXISTS)
  check(filter, options = {}, callback) {
    ({ options, callback } = this.resolveArgs(options, callback));

    let url = `${this.url}/rest/v1/${this.table}?select=*`;

    const query = this.buildFilter(filter, options);
    if (query) url += "&" + query;

    $.ajax({
      url,
      method: "GET",
      headers: this.headers,
      success: (data) => {

        if (options.lambda) {
          data = data.filter(options.lambda);
        }

        const record = data.length > 0 ? data[0] : null;

        if (typeof callback === "function") {
          callback({
            exists: record !== null,
            data: record
          });
        }

      },
      error: err => console.log(err.responseText)
    });
  }
}