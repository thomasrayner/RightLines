import * as vscode from 'vscode';

export let decorateRanges: vscode.Range[] = [];
export let deleteRanges: vscode.Range[] = [];
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
    decorateRanges.push(range);
}

export function addLineToDelete(position: vscode.TextLine) {
    const range = new vscode.Range(position.range.start, position.range.end);
    writeLog("Pushing " + position.range.start.line + " to colleciton of positions to delete");
    deleteRanges.push(range);
}

export function createDecoType(iconPath: string) {
    writeLog("Icon path: " + iconPath);
    writeLog("Creating deco type");
    decoType = vscode.window.createTextEditorDecorationType({
        gutterIconPath: iconPath,
        gutterIconSize: "auto",
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        isWholeLine: true,
        backgroundColor: new vscode.ThemeColor("editor.findMatchHighlightBackground")
    });
}

export function decorateLinesThatMatchString(pattern: string | undefined) {
    writeLog("Called decorateLinesThatMatch");

    if (!vscode.window.activeTextEditor) {
        writeLog("There's no document open");
        vscode.window.showErrorMessage("You don't have an open document to search in");
        return;
    }

    if (!pattern || pattern === "") {
        writeLog("User input was null");
        vscode.window.showErrorMessage("Nothing was provided to search for");
        return;
    }

    writeLog("Clearing other marks");
    vscode.commands.executeCommand('rightlines.ClearGutterIcon');

    const docLines = vscode.window.activeTextEditor.document.getText().split(/\n/);
    var foundMatches = false;

    for (var i = 0; i < docLines.length; i++) {
        if (docLines[i].match(pattern)) {
            const pos = new vscode.Position(i, 0);
            addLineToMark(pos);
            foundMatches = true;
        }
    }

    if (!foundMatches) {
        writeLog("Didn't find user input");
        vscode.window.showWarningMessage("Could not find any lines that match your input: '" + pattern + "'");
        return;
    }

    writeLog("Decorating lines");
    vscode.window.activeTextEditor?.setDecorations(decoType, decorateRanges);
}

export async function deleteLinesThatMatchString(pattern: string | undefined) {
    writeLog("Called deleteLinesThatMatch");

    if (!vscode.window.activeTextEditor) {
        writeLog("There's no document open");
        vscode.window.showErrorMessage("You don't have an open document to search in");
        return;
    }

    if (!pattern || pattern === "") {
        writeLog("User input was null");
        vscode.window.showErrorMessage("Nothing was provided to search for");
        return;
    }

    const docLines = vscode.window.activeTextEditor.document.getText().split(/\n/);
    var foundMatches = false;

    for (var i = 0; i < docLines.length; i++) {
        if (docLines[i].match(pattern)) {
            const pos = vscode.window.activeTextEditor.document.lineAt(i);
            addLineToDelete(pos);
            foundMatches = true;
        }
    }

    if (!foundMatches) {
        writeLog("Didn't find user input");
        vscode.window.showWarningMessage("Could not find any lines that match your input: '" + pattern + "'");
        return;
    }

    writeLog("Deleting lines");

    await vscode.window.activeTextEditor?.edit((editBuilder: vscode.TextEditorEdit) => {
        deleteRanges.forEach(r => {editBuilder.delete(r);});
    });
    
    deleteRanges.splice(0, deleteRanges.length);

}