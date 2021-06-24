import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log("[RightLines] Extension activated");
	console.log("[RightLines] Initializing components");

	const iconPath = context.asAbsolutePath("out/img/rightarrow.png");
	console.log("[RightLines] Icon path: " + iconPath);

	var ranges: vscode.Range[] = [];
	var decoType: vscode.TextEditorDecorationType;

	function addLineToMark(position: vscode.Position) {
		const range = new vscode.Range(position, position);
		console.log("[RightLines] Pushing " + position.line + " to collection of positions to decorate");
		ranges.push(range);
	}

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
		addLineToMark(pos);

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
		addLineToMark(pos);

		console.log("[RightLines] Decorating lines");
		vscode.window.activeTextEditor?.setDecorations(decoType, ranges);

		console.log("[RightLines] MarkArbitraryLine finished");
	});
	context.subscriptions.push(MarkArbitraryLine);

	// MarkArbitraryMatchingLine
	let MarkArbitraryMatchingLine = vscode.commands.registerCommand('rightline.MarkArbitraryMatchingLine', async () => {
		console.log("[RightLines] MarkArbitraryMatchingLine called");
		console.log("[RightLines] Finding location for mark");
		
		if (!vscode.window.activeTextEditor) {
			console.log("[RightLines] There's no document open");
			vscode.window.showErrorMessage("You don't have an open document to search in");
			return;
		}

		const userPattern = await vscode.window.showInputBox({
			prompt: "Mark lines that contain the value: "
		});
		console.log("[RightLines] User entered: " + userPattern);
		
		if (!userPattern || userPattern === "") {
			console.log("[RightLines] User input was null");
			vscode.window.showErrorMessage("You didn't enter a string to search for");
			return;
		}

		console.log("[RightLines] Clearing other marks");
		vscode.commands.executeCommand('rightline.ClearGutterIcon');
	
		const docLines = vscode.window.activeTextEditor.document.getText().split(/\n/);
		var foundMatches = false;

		for (var i = 0; i < docLines.length; i++) {
			if (docLines[i].match(userPattern)) {
				const pos = new vscode.Position(i, 0);
				addLineToMark(pos);
				foundMatches = true;
			}
		}

		if (!foundMatches) {
			console.log("[RightLines] Didn't find user input");
			vscode.window.showWarningMessage("Could not find any lines that match your input: '" + userPattern + "'");
			return;
		}

		console.log("[RightLines] Decorating lines");
		vscode.window.activeTextEditor?.setDecorations(decoType, ranges);

		console.log("[RightLines] MarkArbitraryMatchingLine finished");
	});
	context.subscriptions.push(MarkArbitraryMatchingLine);
}

export function deactivate() {console.log("[RightLines] Extension deactivated");}
