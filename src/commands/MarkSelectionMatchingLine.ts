import * as vscode from 'vscode';
import * as utils from '../utils';

export async function MarkSelectionMatchingLine() {
    utils.writeLog("MarkSelectionMatchingLine called");
    utils.writeLog("Finding location for mark");

    if (!vscode.window.activeTextEditor) {
        utils.writeLog("There's no document open");
        vscode.window.showErrorMessage("You don't have an open document to search in");
        return;
    }

    const userPattern = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
    utils.writeLog("User entered: " + userPattern);

    if (!userPattern || userPattern === "") {
        utils.writeLog("User input was null");
        vscode.window.showErrorMessage("You don't have any text selected");
        return;
    }

    utils.writeLog("Clearing other marks");
    vscode.commands.executeCommand('rightlines.ClearGutterIcon');

    const docLines = vscode.window.activeTextEditor.document.getText().split(/\n/);
    var foundMatches = false;

    for (var i = 0; i < docLines.length; i++) {
        if (docLines[i].match(userPattern)) {
            const pos = new vscode.Position(i, 0);
            utils.addLineToMark(pos);
            foundMatches = true;
        }
    }

    if (!foundMatches) {
        utils.writeLog("Didn't find user input");
        vscode.window.showWarningMessage("Could not find any lines that match your input: '" + userPattern + "'");
        return;
    }

    utils.writeLog("Decorating lines");
    vscode.window.activeTextEditor?.setDecorations(utils.decoType, utils.ranges);

    utils.writeLog("MarkArbitraryMatchingLine finished");
}