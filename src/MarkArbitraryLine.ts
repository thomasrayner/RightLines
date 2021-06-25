import * as vscode from 'vscode';
import * as utils from './utils';

export async function MarkArbitraryLine() {
    console.log("[RightLines] MarkArbitraryLine called");
    var lineNumber;

    console.log("[RightLines] Finding location for mark");
    const userLine = await vscode.window.showInputBox({
        prompt: "Enter line number to mark"
    });

    console.log("[RightLines] User entered: " + userLine);
    console.log("[RightLines] Converting user input to number");
    lineNumber = Number.parseInt(userLine ? userLine : "");

    if (Number.isInteger(lineNumber)) {
        console.log("[RightLines] User input converted to number (minus 1 to match document numbering): " + (lineNumber - 1));
    }
    else {
        console.log("[RightLines] User input was not a number");
        vscode.window.showErrorMessage("You did not enter a number (lines are numbered): '" + userLine + "'");
        return;
    }

    if (lineNumber <= 0) {
        console.log("[RightLines] User input was negative");
        vscode.window.showErrorMessage("You entered a negative number or zero (documents don't have negative numbers of lines): '" + userLine + "'");
        return;
    }

    console.log("[RightLines] Clearing other marks");
    vscode.commands.executeCommand('rightline.ClearGutterIcon');

    const pos = new vscode.Position(lineNumber - 1, 0);
    utils.addLineToMark(pos);

    console.log("[RightLines] Decorating lines");
    vscode.window.activeTextEditor?.setDecorations(utils.decoType, utils.ranges);

    console.log("[RightLines] MarkArbitraryLine finished");
}