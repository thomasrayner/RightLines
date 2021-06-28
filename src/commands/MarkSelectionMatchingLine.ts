import * as vscode from 'vscode';
import * as utils from '../utils';

export async function MarkSelectionMatchingLine() {
    utils.writeLog("MarkSelectionMatchingLine called");
    const userPattern = vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor.selection);
    utils.writeLog("User entered: " + userPattern);
    utils.decorateLinesThatMatchString(userPattern);
    utils.writeLog("MarkSelectionMatchingLine finished");
}
