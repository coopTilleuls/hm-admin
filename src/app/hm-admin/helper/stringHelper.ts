export let stringHelper = {
  toCamelCase(target: string): string {
    target = target.replace(/([-_,\.;:+ ]+)(\w)/g, (match, p1, p2) => p2.toUpperCase());
    let [first, ...rest] = target.split('');

    return first.toLowerCase().concat(rest.join(''));
  }
};
