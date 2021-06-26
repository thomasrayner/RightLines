import * as vscode from 'vscode';

export let ranges: vscode.Range[] = [];
export let decoType: vscode.TextEditorDecorationType;
export let iconPath: string;

export function setIconPath(path: string) {
    iconPath = path;
}

export function writeLog(entry: string) {
    console.log("[RightLines] " + entry);
}

export function addLineToMark(position: vscode.Position) {
    const range = new vscode.Range(position, position);
    writeLog("Pushing " + position.line + " to collection of positions to decorate");
    ranges.push(range);
}

export function createDecoType(iconPath: string) {
    writeLog("Icon path: " + iconPath);
    writeLog("Creating deco type");
    decoType = vscode.window.createTextEditorDecorationType(
        {
            gutterIconPath: iconPath,
            gutterIconSize: "auto",
            rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            isWholeLine: true,
            backgroundColor: new vscode.ThemeColor("editor.findMatchHighlightBackground")
        }
    );
}