import * as vscode from 'vscode';
import * as utils from './utils';
import { MarkThisLine } from './MarkThisLine';
import { ClearGutterIcon } from './ClearGutterIcon';
import { MarkArbitraryLine } from './MarkArbitraryLine';
import { MarkArbitraryMatchingLine } from './MarkArbitraryMatchingLine';

export function activate(context: vscode.ExtensionContext) {
	console.log("[RightLines] Extension activated");
	console.log("[RightLines] Initializing components");

	utils.setIconPath(context.asAbsolutePath("out/img/rightarrow.png"));
	utils.createDecoType(utils.iconPath);

	// MarkThisLine
	context.subscriptions.push(vscode.commands.registerCommand('rightline.MarkThisLine', MarkThisLine));

	// ClearGutterIcon
	context.subscriptions.push(vscode.commands.registerCommand('rightline.ClearGutterIcon', ClearGutterIcon));

	// MarkArbitraryLine
	context.subscriptions.push(vscode.commands.registerCommand('rightline.MarkArbitraryLine', MarkArbitraryLine));

	// MarkArbitraryMatchingLine
	context.subscriptions.push(vscode.commands.registerCommand('rightline.MarkArbitraryMatchingLine', MarkArbitraryMatchingLine));
}

export function deactivate() {console.log("[RightLines] Extension deactivated");}
