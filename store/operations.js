import * as RNFS from 'react-native-fs';
import OperationHelpers from './helpers';


/**
 * sequenceofOps
 * Create a sequence in which operations are to be executed.
 * @param {Object} values are the values of form fields
 * @returns {Array} list of operations
 */
const sequenceofOps = (values) => ([
  { name: 'op.enddel', params: { count: values.lastRef }},
  { name: 'op.delete', params: { start: values.fromToStartRef, end: values.fromToEndRef } },
  { name: 'op.move', params: { start: values.moveFromStartRef, end: values.moveFromEndRef, offset: values.moveToRef } },
  { name: 'op.replace', params: { find: values.replaceFindRef, replacement: values.replaceReplaceRef } },
  { name: 'op.insert', params: { insert: values.insertValRef, at: values.insertAtRef } },
  { name: 'op.prefix', params: { prefix: values.prefixRef } },
  { name: 'op.suffix', params: { suffix: values.suffixRef } },
  { name: 'op.case', params: { toCase: values.caseRef } },
  { name: 'op.extension', params: { ext: values.extensionValRef } },
]);


/**
 * Take the React Native refs and extract values from the components related to them
 * @param {Object} refs are the refs to form components
 * @returns {Object} containing the extracted values
 */
export const RefsToValues = (refs) => {
  let values = {};
  for (let prop in refs) {
    values[prop] = (refs[prop].current?.state?.value || (
      refs[prop].current?.props?.selectedValue !== null
      && refs[prop].current?.props?.selectedValue !== undefined
        ? refs[prop].current?.props?.selectedValue
        : null));
  }
  return values;
}


/**
 * ExecuteOperations
 * Executes the operations on a given value using a sequence of operations
 * @param {Object} formParams are the values of form fields
 * @param {String} value is the initial string on which operations are executed
 * @returns {String} changed string
 */
const ExecuteOperations = (formParams, value) => {
  const sequence = sequenceofOps(formParams);
  const extInd = value.lastIndexOf('.');
  const extension = extInd === -1 ? '' : '.' + value.slice(extInd + 1);
  value = extInd === -1 ? value : value.slice(0, extInd);

  for(let op of sequence) {
    value = OperationHelpers[op.name]({ val: value, ...op.params });
  }
  return value + extension;
}


/**
 * Rename
 * The main function which executes the operations and renames the files' names
 * @param {Object} properties of global state containing data about the files to be renamed
 * @param {Object} properties from reducer
 */
export const Rename = ({refs, entries, directoryPath}, { onUpdate, onSuccess }) => {
  directoryPath = RNFS.ExternalStorageDirectoryPath + directoryPath + '/';
  let totalEntries = entries.length;
  const formParams = RefsToValues(refs);
  let completeCounter = 0;
  let errorFiles = [];
  let ivl = setInterval(() => (
    onUpdate && onUpdate(parseInt(completeCounter / totalEntries * 100))), 500);

  for(let file of entries) {
    const oldPath = file.path;
    const newPath = directoryPath + ExecuteOperations(formParams, file.name);
    RNFS.moveFile(oldPath, newPath)
      .then(_ => {
        completeCounter++;
        if(completeCounter === entries.length - 1) {
          clearInterval(ivl);
          onSuccess && onSuccess(errorFiles);
        }
      })
      .catch(err => {
        errorFiles.append(file)
        if(completeCounter === entries.length - 1) {
          clearInterval(ivl);
          onSuccess && onSuccess(errorFiles);
        }
      });
  }
}


export default ExecuteOperations;