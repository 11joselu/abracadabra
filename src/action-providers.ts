import * as vscode from "vscode";

import { createSelectionFromVSCode } from "./editor/adapters/vscode-editor";
import { Code } from "./editor/editor";
import { Selection } from "./editor/selection";
import { RefactoringWithActionProvider } from "./types";

export { RefactoringActionProvider };

class RefactoringActionProvider implements vscode.CodeActionProvider {
  private refactorings: RefactoringWithActionProvider[];

  constructor(refactorings: RefactoringWithActionProvider[]) {
    this.refactorings = refactorings;
  }

  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection
  ): vscode.ProviderResult<vscode.CodeAction[]> {
    const code = document.getText();
    const selection = createSelectionFromVSCode(range);

    return this.refactorings
      .filter(refactoring => this.canPerform(refactoring, code, selection))
      .map(refactoring => this.buildCodeActionFor(refactoring));
  }

  private canPerform(
    refactoring: RefactoringWithActionProvider,
    code: Code,
    selection: Selection
  ) {
    try {
      return refactoring.canPerformRefactoring(code, selection);
    } catch (_) {
      // Silently fail, we don't care why it failed (e.g. code can't be parsed).
      return false;
    }
  }

  private buildCodeActionFor(refactoring: RefactoringWithActionProvider) {
    const action = new vscode.CodeAction(
      `✨ ${refactoring.actionProviderMessage}`,
      vscode.CodeActionKind.RefactorRewrite
    );

    action.isPreferred = refactoring.isPreferred;
    action.command = {
      command: refactoring.commandKey,
      title: refactoring.title
    };

    return action;
  }
}
