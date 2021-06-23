import * as vscode from 'vscode';
const path = require('path');

export const iconPath = __dirname + path.sep + "img" + path.sep + "rightarrow.png";
export var ranges: vscode.Range[] = [];
var decoType: vscode.TextEditorDecorationType;

export function createDecoType() {
	console.log("[RightLines] Creating deco type");
	decoType = vscode.window.createTextEditorDecorationType(
		{
			gutterIconPath: iconPath,
			gutterIconSize: "auto",
			rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
		}
	);
}

export function activate(context: vscode.ExtensionContext) {
	console.log("[RightLines] Extension activated");
	createDecoType();

	// TestGutterIcon
	let TestGutterIconDisposable = vscode.commands.registerCommand('rightline.TestGutterIcon', () => {
		console.log("[RightLines] TestGutterIcon called");
		console.log("[RightLines] Icon path: " + iconPath);
		const pos: vscode.Position = vscode.window.activeTextEditor ? 
			vscode.window.activeTextEditor?.selection.start :
			new vscode.Position(0, 0);
		const range = new vscode.Range(pos, pos);
		console.log("[RightLines] Pushing current position to collection of positions to decorate");
		ranges.push(range);
		console.log("[RightLines] Decorating lines");
		vscode.window.activeTextEditor?.setDecorations(decoType, ranges);
		console.log("[RightLines] TestGutterIcon finished");
	});
	context.subscriptions.push(TestGutterIconDisposable);

	// ClearGutterIcon
	let ClearGutterIconDisposable = vscode.commands.registerCommand('rightline.ClearGutterIcon', () => {
		console.log("[RightLines] ClearGutterIcon called");
		console.log("[RightLines] Disposing of decoType");
		decoType.dispose();
		console.log("[RightLines] Clearing out collection of positions to decorate");
		ranges.splice(0, ranges.length);
		createDecoType();
	});
	context.subscriptions.push(ClearGutterIconDisposable);
}

export function deactivate() { }
