export const urlHelper = {

  /**
   * get path with params
   *
   * @param {string} url
   * @param {string} params
   *
   * @returns {string}
   */
  getPath(url: string, addiionnalParams: any): string {
    const [path, ] = url.split('?');

    return path + urlHelper.getParams(url, addiionnalParams);
  },

  /**
   * transform parameter's object to URL parameters
   *
   * @param {string} url
   * @param {string} params
   *
   * @returns {string}
   */
  getParams(url: string, params: any): string {
    const currentParams = urlHelper.getUrlParams(url),
      mergedParams = Object.assign({}, currentParams, params),
      urlParams: string = Object.keys(mergedParams).map(key => {
          return `${key}=${mergedParams[key]}`;
        })
        .join('&');

    return urlParams ? `?${urlParams}` : '';
  },

  /**
   * extract parameters from URL
   *
   * @param url
   *
   * @returns {any}
   */
  getUrlParams(url): any {
    let urlParams = {};
    const [, ...params] = url.split(/[\?\&]/g);

    params.forEach(param => {
      const [, key, value, ] = param.match(/(\w*)=(\w*)/);

      if (key !== undefined) {
        Object.defineProperty(urlParams, key, {value: value, writable: true, enumerable: true});
      }
    });

    return urlParams;
  }

};
