import * as vscode from 'vscode';
import * as utils from './utils';
import { MarkThisLine } from './commands';
import { ClearGutterIcon } from './commands';
import { MarkArbitraryLine } from './commands';
import { MarkArbitraryMatchingLine } from './commands';
import { MarkSelectionMatchingLine } from './commands';
import { DeleteArbitraryMatchingLine } from './commands';
import { DeleteSelectionMatchingLine } from './commands';
import { DeleteEmptyLines } from './commands';
import { MarkDuplicateLines } from './commands';
import { DeleteDuplicateLinesKeepFirst } from './commands';
import { DeleteDuplicateLinesKeepLast } from './commands';
import { MarkDuplicateLinesSkipFirst } from './commands';

export function activate(context: vscode.ExtensionContext) {
	utils.writeLog("Extension activated");
	utils.writeLog("Initializing components");

	utils.setIconPath(context.asAbsolutePath("out/img/rightarrow.png"));
	utils.createDecoType(utils.iconPath);

	context.subscriptions.push(vscode.commands.registerCommand('rightlines.MarkThisLine', MarkThisLine));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.ClearGutterIcon', ClearGutterIcon));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.MarkArbitraryLine', MarkArbitraryLine));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.MarkArbitraryMatchingLine', MarkArbitraryMatchingLine));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.MarkSelectionMatchingLine', MarkSelectionMatchingLine));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.DeleteArbitraryMatchingLine', DeleteArbitraryMatchingLine));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.DeleteSelectionMatchingLine', DeleteSelectionMatchingLine));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.DeleteEmptyLines', DeleteEmptyLines));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.MarkDuplicateLines', MarkDuplicateLines));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.DeleteDuplicateLinesKeepFirst', DeleteDuplicateLinesKeepFirst));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.DeleteDuplicateLinesKeepLast', DeleteDuplicateLinesKeepLast));
	context.subscriptions.push(vscode.commands.registerCommand('rightlines.MarkDuplicateLinesSkipFirst', MarkDuplicateLinesSkipFirst));
}

export function deactivate() { utils.writeLog("Extension deactivated"); }
