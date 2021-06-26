import * as vscode from 'vscode';
import * as utils from './utils';
import { MarkThisLine } from './MarkThisLine';
import { ClearGutterIcon } from './ClearGutterIcon';
import { MarkArbitraryLine } from './MarkArbitraryLine';
import { MarkArbitraryMatchingLine } from './MarkArbitraryMatchingLine';

export function activate(context: vscode.ExtensionContext) {
	utils.writeLog("Extension activated");
	utils.writeLog("Initializing components");

	utils.setIconPath(context.asAbsolutePath("out/img/rightarrow.png"));
	utils.createDecoType(utils.iconPath);

	context.subscriptions.push(vscode.commands.registerCommand('rightlines.MarkThisLine', MarkThisLine));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.ClearGutterIcon', ClearGutterIcon));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.MarkArbitraryLine', MarkArbitraryLine));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.MarkArbitraryMatchingLine', MarkArbitraryMatchingLine));
}

export function deactivate() { utils.writeLog("Extension deactivated"); }
