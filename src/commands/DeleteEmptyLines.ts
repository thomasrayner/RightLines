import * as utils from '../utils';

export async function DeleteEmptyLines() {
    utils.writeLog("DeleteEmptyLines called");
    const userPattern = /^\s*$/;
    utils.writeLog("User entered: " + userPattern);
    utils.deleteLinesThatMatchString(userPattern);
    utils.writeLog("DeleteEmptyLines finished");
}
