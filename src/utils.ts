import * as vscode from 'vscode';

export let ranges: vscode.Range[] = [];
export let decoType: vscode.TextEditorDecorationType;
export let iconPath: string;

export function setIconPath(path: string) {
    iconPath = path;
}

export function addLineToMark(position: vscode.Position) {
    const range = new vscode.Range(position, position);
    console.log("[RightLines] Pushing " + position.line + " to collection of positions to decorate");
    ranges.push(range);
}

export function createDecoType(iconPath: string) {
    console.log("[RightLines] Icon path: " + iconPath);
    console.log("[RightLines] Creating deco type");
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