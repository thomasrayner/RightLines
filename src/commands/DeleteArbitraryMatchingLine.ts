import * as vscode from 'vscode';
import * as utils from '../utils';

export async function DeleteArbitraryMatchingLine() {
    utils.writeLog("DeleteArbitraryMatchingLine called");
    const userPattern = await vscode.window.showInputBox({ prompt: "Delete lines that contain the value" });
    utils.writeLog("User entered: " + userPattern);
    utils.deleteLinesThatMatchString(userPattern);
    utils.writeLog("DeleteArbitraryMatchingLine finished");
}
