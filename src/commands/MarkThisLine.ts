import * as vscode from 'vscode';
import * as utils from '../utils';

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