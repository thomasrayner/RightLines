import * as vscode from 'vscode';
import * as utils from './utils';

export function ClearGutterIcon() {
    utils.writeLog("ClearGutterIcon called");
    utils.writeLog("Disposing of decoType");
    utils.decoType.dispose();

    utils.writeLog("Clearing out collection of positions to decorate");
    utils.decorateRanges.splice(0, utils.decorateRanges.length);

    utils.createDecoType(utils.iconPath);
}

export async function DeleteArbitraryMatchingLine() {
    utils.writeLog("DeleteArbitraryMatchingLine called");
    const userPattern = await vscode.window.showInputBox({ prompt: "Delete lines that contain the value" });
    utils.writeLog("User entered: " + userPattern);
    utils.deleteLinesThatMatchString(userPattern);
    utils.writeLog("DeleteArbitraryMatchingLine finished");
}

export function DeleteEmptyLines() {
    utils.writeLog("DeleteEmptyLines called");
    const userPattern = /^\s*$/;
    utils.writeLog("User entered: " + userPattern);
    utils.deleteLinesThatMatchString(userPattern);
    utils.writeLog("DeleteEmptyLines finished");
}

export async function DeleteDuplicateLinesKeepFirst() {
    utils.writeLog("DeleteDuplicateLinesKeepFirst called");

    const duplicateLines = utils.findDuplicateLines();

    if (!duplicateLines || duplicateLines.size === 0) {
        utils.writeLog("No duplicate lines found");
        vscode.window.showInformationMessage("Did not find any duplicate lines");
        return;
    }

    duplicateLines.forEach(r => {
        if (r.length > 1) {
            r.shift();
            r.forEach((s: any) => {
                if (vscode.window.activeTextEditor) {
                    const line = vscode.window.activeTextEditor.document.lineAt(s);
                    utils.addLineToDelete(line);
                }
            });
        }
    });

    utils.deletePendingLines();

    utils.writeLog("DeleteDuplicateLinesKeepFirst finished");
}

export function DeleteDuplicateLinesKeepLast() {
    utils.writeLog("DeleteDuplicateLinesKeepFirst called");
    const duplicateLines = utils.findDuplicateLines();

    if (!duplicateLines || duplicateLines.size === 0) {
        utils.writeLog("No duplicate lines found");
        vscode.window.showInformationMessage("Did not find any duplicate lines");
        return;
    }

    duplicateLines.forEach(r => {
        if (r.length > 1) {
            r.pop();
            r.forEach((s: any) => {
                if (vscode.window.activeTextEditor) {
                    const line = vscode.window.activeTextEditor.document.lineAt(s);
                    utils.addLineToDelete(line);
                }
            });
        }
    });

    utils.deletePendingLines();

    utils.writeLog("DeleteDuplicateLinesKeepFirst finished");
}

export function DeleteSelectionMatchingLine() {
    utils.writeLog("DeleteSelectionMatchingLine called");
    const userPattern = vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor.selection);
    utils.writeLog("User entered: " + userPattern);
    utils.deleteLinesThatMatchString(userPattern);
    utils.writeLog("DeleteSelectionMatchingLine finished");
}

export async function MarkArbitraryLine() {
    utils.writeLog("MarkArbitraryLine called");
    var lineNumber;

    console.log("[RightLines] Finding location for mark");
    const userLine = await vscode.window.showInputBox({
        prompt: "Enter line number to mark"
    });

    utils.writeLog("User entered: " + userLine);
    console.log("[RightLines] Converting user input to number");
    lineNumber = Number.parseInt(userLine ? userLine : "");

    if (Number.isInteger(lineNumber)) {
        utils.writeLog("User input converted to number (minus 1 to match document numbering): " + (lineNumber - 1));
    }
    else {
        utils.writeLog("User input was not a number");
        vscode.window.showErrorMessage("You did not enter a number (lines are numbered): '" + userLine + "'");
        return;
    }

    if (lineNumber <= 0) {
        utils.writeLog("User input was negative");
        vscode.window.showErrorMessage("You entered a negative number or zero (documents don't have negative numbers of lines): '" + userLine + "'");
        return;
    }

    utils.writeLog("Clearing other marks");
    vscode.commands.executeCommand('rightlines.ClearGutterIcon');

    const pos = new vscode.Position(lineNumber - 1, 0);
    utils.addLineToMark(pos);

    utils.writeLog("Decorating lines");
    vscode.window.activeTextEditor?.setDecorations(utils.decoType, utils.decorateRanges);

    utils.writeLog("MarkArbitraryLine finished");
}

export async function MarkArbitraryMatchingLine() {
    utils.writeLog("MarkArbitraryMatchingLine called");
    const userPattern = await vscode.window.showInputBox({ prompt: "Mark lines that contain the value" });
    utils.writeLog("User entered: " + userPattern);
    utils.decorateLinesThatMatchString(userPattern);
    utils.writeLog("MarkArbitraryMatchingLine finished");
}

export function MarkDuplicateLines(){
    utils.writeLog("MarkDuplicateLines called");
    const duplicateLines = utils.findDuplicateLines();

    utils.writeLog("Clearing other marks");
    vscode.commands.executeCommand('rightlines.ClearGutterIcon');

    if (!duplicateLines || duplicateLines.size === 0) {
        utils.writeLog("No duplicate lines found");
        vscode.window.showInformationMessage("Did not find any duplicate lines");
        return;
    }

    duplicateLines.forEach(r => {
        if (r.length > 1) {
            r.forEach((s: any) => {
                const pos = new vscode.Position(s, 0);
                utils.addLineToMark(pos);
            });
        }
    });

    utils.writeLog("Decorating lines");
    vscode.window.activeTextEditor?.setDecorations(utils.decoType, utils.decorateRanges);

    utils.writeLog("MarkDuplicateLines finished");
}

export async function MarkSelectionMatchingLine() {
    utils.writeLog("MarkSelectionMatchingLine called");
    const userPattern = vscode.window.activeTextEditor?.document.getText(vscode.window.activeTextEditor.selection);
    utils.writeLog("User entered: " + userPattern);
    utils.decorateLinesThatMatchString(userPattern);
    utils.writeLog("MarkSelectionMatchingLine finished");
}

export function MarkThisLine() {
    utils.writeLog("MarkThisLine called");
    utils.writeLog("Clearing other marks");
    vscode.commands.executeCommand('rightlines.ClearGutterIcon');

    utils.writeLog("Finding location for mark");
    const pos: vscode.Position = vscode.window.activeTextEditor ?
        vscode.window.activeTextEditor?.selection.start :
        new vscode.Position(0, 0);
    utils.addLineToMark(pos);

    utils.writeLog("Decorating lines");
    vscode.window.activeTextEditor?.setDecorations(utils.decoType, utils.decorateRanges);

    utils.writeLog("MarkThisLine finished");
}
