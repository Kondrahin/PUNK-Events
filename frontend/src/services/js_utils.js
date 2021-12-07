export function hasKeyValue (array, key, value) {
    let json = JSON.stringify(array);
    return json.indexOf('"'+key+'":"'+value+'"')>-1;
}
