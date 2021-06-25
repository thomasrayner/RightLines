import * as vscode from 'vscode';
import * as utils from './utils';

export function MarkThisLine() {
    console.log("[RightLines] MarkThisLine called");
    console.log("[RightLines] Clearing other marks");
    vscode.commands.executeCommand('rightline.ClearGutterIcon');

    console.log("[RightLines] Finding location for mark");
    const pos: vscode.Position = vscode.window.activeTextEditor ?
        vscode.window.activeTextEditor?.selection.start :
        new vscode.Position(0, 0);
    utils.addLineToMark(pos);

    console.log("[RightLines] Decorating lines");
    vscode.window.activeTextEditor?.setDecorations(utils.decoType, utils.ranges);

    console.log("[RightLines] MarkThisLine finished");
}