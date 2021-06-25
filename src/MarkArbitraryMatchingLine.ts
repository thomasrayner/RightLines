import * as vscode from 'vscode';
import * as utils from './utils';

export async function MarkArbitraryMatchingLine() {
    console.log("[RightLines] MarkArbitraryMatchingLine called");
    console.log("[RightLines] Finding location for mark");

    if (!vscode.window.activeTextEditor) {
        console.log("[RightLines] There's no document open");
        vscode.window.showErrorMessage("You don't have an open document to search in");
        return;
    }

    const userPattern = await vscode.window.showInputBox({
        prompt: "Mark lines that contain the value: "
    });
    console.log("[RightLines] User entered: " + userPattern);

    if (!userPattern || userPattern === "") {
        console.log("[RightLines] User input was null");
        vscode.window.showErrorMessage("You didn't enter a string to search for");
        return;
    }

    console.log("[RightLines] Clearing other marks");
    vscode.commands.executeCommand('rightline.ClearGutterIcon');

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
        console.log("[RightLines] Didn't find user input");
        vscode.window.showWarningMessage("Could not find any lines that match your input: '" + userPattern + "'");
        return;
    }

    console.log("[RightLines] Decorating lines");
    vscode.window.activeTextEditor?.setDecorations(utils.decoType, utils.ranges);

    console.log("[RightLines] MarkArbitraryMatchingLine finished");
}
