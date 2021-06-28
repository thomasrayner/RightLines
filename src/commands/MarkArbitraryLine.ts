import * as vscode from 'vscode';
import * as utils from '../utils';

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
    vscode.window.activeTextEditor?.setDecorations(utils.decoType, utils.ranges);

    utils.writeLog("MarkArbitraryLine finished");
}