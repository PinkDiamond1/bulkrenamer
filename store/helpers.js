/**
 * Functions to check if the given values is valid number or null
 * @returns {Boolean} result
 */
const isNum = val => val !== null && val !== undefined;
const isPositiveNum = val => isNum(val) && val >= 0;
const isOptionalNum = val => isNum(val) || !val;
const isPositiveOptionalNum = val => isOptionalNum(val) && isPositiveNum(val);

/**
 * OperationHelpers
 * Utility functions which recieve a string and convert it according to the params
 * These are the main helper functions for renaming.
 */
const OperationHelpers = {
  /**
   * Adds a prefix to the given string
   * @param {Object} prefix is the string to be added as prefix
   * @returns {String} formatted string
   */
  'op.prefix': ({val, prefix}) => (
    prefix ? prefix.trimLeft() + val : val
  ),

  /**
   * Adds a suffix to the given string
   * @param {Object} suffix is the string to be added as suffix
   * @returns {String} formatted string
   */
  'op.suffix': ({val, suffix}) => (
    suffix ? val + suffix.trimRight() : val
  ),

  /**
   * Insert a substring at a given index
   * @param {Object} insert is the substring to be inserted at given index
   * @returns {String} formatted string
   */
  'op.insert': ({val, insert, at}) => (
    isPositiveNum(insert) && isPositiveOptionalNum(at)
    ? val.slice(0, (at || 0)) + insert + val.slice((at || 0)) 
    : val
  ),

  /**
   * Delete a given count of characters from the end of the string
   * @param {Object} count is the number of characters to be deleted from the end
   * @returns {String} formatted string
   */
  'op.enddel': ({val, count}) => (
    isPositiveNum(count)
    ? val.slice(0, val.length - count <= 0 ? val.length : val.length - count)
    : val
  ),

  /**
   * Delete a substring in a given range of indices
   * @param {Object} [start, end) is the range
   * @returns {String} formatted string
   */
  'op.delete': ({val, start, end}) => (
    isPositiveNum(start) && isPositiveOptionalNum(end)
    ? (val.slice(0, start) + val.slice(end === null ? val.length : end))
    : val
  ),

  /**
   * Find and replace a substring
   * @param {Object} find the substring (case-insensitive) and replace it with new string
   * @returns {String} formatted string
   */
  'op.replace': ({val, find, replacement}) => (
    find && replacement ? val.replace(new RegExp(find, 'gi'), replacement) : val
  ),

  /**
   * Add a suffix to the given string
   * @param {Object} ext is the new extension to be added at the end
   * @returns {String} formatted string
   */
  'op.extension': ({val, ext}) => (
    ext ? val + '.' + ext : val
  ),

  /**
   * Changes the case of the given string to lower, upper, sentence, or title case
   * @param {Object} toCase is the new case of the string
   * @returns {String} formatted string
   */
  'op.case': ({val, toCase}) => {
    if (toCase === -1) return val;
    else if (toCase === 0) return val.toUpperCase();
    else if (toCase === 1) return val.toLowerCase();
    else if (toCase === 2) return val.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    else if (toCase === 3) return val.replace(/(^\w{1}|\.\s*\w{1})/gi, x => x.toUpperCase());
  },

  /**
   * Moves a substring in [start, end) range to [offset + start) position
   * @param {Object} start and end indices, offset from the start position
   * @returns {String} formatted string
   */
  'op.move': ({val, start, end, offset}) => {
    start = isPositiveNum(start) ? parseInt(start) : 0;
    end = isPositiveNum(end) ? parseInt(end) : val.length;
    offset = isNum(offset) ? parseInt(offset) : val.length;
    if(start <= end) {

      let substr = val.slice(start, end);
      offset = start + offset < 0 
        ? 0
        : (start + offset > val.length - start ? val.length : start + offset);
      val = val.slice(0, start) + val.slice(end);
      return val.slice(0, offset) + substr + val.slice(offset);

    } else return val;
  }
};


export default OperationHelpers;