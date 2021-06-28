import * as vscode from 'vscode';
import * as utils from '../utils';

export async function DeleteSelectionMatchingLine() {
    utils.writeLog("DeleteSelectionMatchingLine called");
    const userPattern = vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor.selection);
    utils.writeLog("User entered: " + userPattern);
    utils.deleteLinesThatMatchString(userPattern);
    utils.writeLog("DeleteSelectionMatchingLine finished");
}
