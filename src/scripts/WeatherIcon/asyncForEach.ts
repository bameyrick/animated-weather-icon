export default async function asyncForEach(array: any[], callback: Function): Promise<any> {
  for (let index = 0, arrayLength = array.length; index < arrayLength; index++) {
    await callback(array[index], index, array);
  }
}
