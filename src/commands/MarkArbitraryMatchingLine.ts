import * as vscode from 'vscode';
import * as utils from '../utils';

export async function MarkArbitraryMatchingLine() {
    utils.writeLog("MarkArbitraryMatchingLine called");
    const userPattern = await vscode.window.showInputBox({prompt: "Mark lines that contain the value"});
    utils.writeLog("User entered: " + userPattern);
    utils.decorateLinesThatMatchString(userPattern);
    utils.writeLog("MarkArbitraryMatchingLine finished");
}
