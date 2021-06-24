import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log("[RightLines] Extension activated");
	console.log("[RightLines] Initializing components");

	const iconPath = context.asAbsolutePath("out/img/rightarrow.png");
	console.log("[RightLines] Icon path: " + iconPath);

	var ranges: vscode.Range[] = [];
	var decoType: vscode.TextEditorDecorationType;

	function createDecoType() {
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
	createDecoType();

	// MarkThisLine
	let TestGutterIconDisposable = vscode.commands.registerCommand('rightline.MarkThisLine', () => {
		console.log("[RightLines] MarkThisLine called");
		console.log("[RightLines] Clearing other marks");
		vscode.commands.executeCommand('rightline.ClearGutterIcon');

		console.log("[RightLines] Finding location for mark");
		const pos: vscode.Position = vscode.window.activeTextEditor ? 
			vscode.window.activeTextEditor?.selection.start :
			new vscode.Position(0, 0);
		const range = new vscode.Range(pos, pos);

		console.log("[RightLines] Pushing current position to collection of positions to decorate");
		ranges.push(range);

		console.log("[RightLines] Decorating lines");
		vscode.window.activeTextEditor?.setDecorations(decoType, ranges);

		console.log("[RightLines] MarkThisLine finished");
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

	// MarkArbitraryLine
	let MarkArbitraryLine = vscode.commands.registerCommand('rightline.MarkArbitraryLine', async () => {
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
			console.log("[RightLines] User input converted to number");
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
		const range = new vscode.Range(pos, pos);

		console.log("[RightLines] Pushing current position to collection of positions to decorate");
		ranges.push(range);

		console.log("[RightLines] Decorating lines");
		vscode.window.activeTextEditor?.setDecorations(decoType, ranges);

		console.log("[RightLines] MarkArbitraryLine finished");
	});
	context.subscriptions.push(MarkArbitraryLine);
}

export function deactivate() {console.log("[RightLines] Extension deactivated");}
