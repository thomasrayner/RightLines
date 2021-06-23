import * as vscode from 'vscode';
const path = require('path');

export const iconPath = __dirname + path.sep + "img" + path.sep + "rightarrow.png";
var decoType: vscode.TextEditorDecorationType;

export function createDecoType() {
	decoType = vscode.window.createTextEditorDecorationType(
		{
			gutterIconPath: iconPath,
			gutterIconSize: "auto",
			rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
		}
	);
}

export function activate(context: vscode.ExtensionContext) {
	// TestGutterIcon
	let TestGutterIconDisposable = vscode.commands.registerCommand('rightline.TestGutterIcon', () => {
		createDecoType();
		console.log(iconPath)
		const range = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0));
		vscode.window.activeTextEditor?.setDecorations(decoType, [range]);
	});
	context.subscriptions.push(TestGutterIconDisposable);

	// ClearGutterIcon
	let ClearGutterIconDisposable = vscode.commands.registerCommand('rightline.ClearGutterIcon', () => {
		decoType.dispose();
	});

	context.subscriptions.push(ClearGutterIconDisposable);
}

export function deactivate() { }
