export { ShowErrorMessage, ErrorReason, toString };

type ShowErrorMessage = (reason: ErrorReason) => Promise<void>;

enum ErrorReason {
  DidNotFoundExtractableCode,
  DidNotFoundInlinableCode,
  DidNotFoundInlinableCodeIdentifiers,
  DidNotFoundNegatableExpression,
  DidNotFoundRedundantElse,
  DidNotFoundIfElseToFlip,
  DidNotFoundTernaryToFlip,
  DidNotFoundIfElseToConvert,
  DidNotFoundTernaryToConvert,
  CantMoveStatementUp,
  CantMoveMultiLinesStatementUp,
  CantMoveStatementDown,
  CantMoveMultiLinesStatementDown,
  CantInlineExportedVariables,
  CantInlineRedeclaredVariables
}

function toString(reason: ErrorReason): string {
  switch (reason) {
    case ErrorReason.DidNotFoundExtractableCode:
      return didNotFound("a valid code to extract");

    case ErrorReason.DidNotFoundInlinableCode:
      return didNotFound("a valid code to inline");

    case ErrorReason.DidNotFoundInlinableCodeIdentifiers:
      return "I didn't found references of this variable in the code 🤔";

    case ErrorReason.DidNotFoundNegatableExpression:
      return didNotFound("a valid expression to negate");

    case ErrorReason.DidNotFoundRedundantElse:
      return didNotFound("a redundant else to remove");

    case ErrorReason.DidNotFoundIfElseToFlip:
      return didNotFound("an if statement to flip");

    case ErrorReason.DidNotFoundTernaryToFlip:
      return didNotFound("a ternary to flip");

    case ErrorReason.DidNotFoundIfElseToConvert:
      return didNotFound("a valid if statement to convert into ternary");

    case ErrorReason.DidNotFoundTernaryToConvert:
      return didNotFound("a ternary to convert into if statement");

    case ErrorReason.CantMoveStatementUp:
      return "I'm sorry, I can't move this statement up 😅";

    case ErrorReason.CantMoveMultiLinesStatementUp:
      return "I'm sorry, I can't move up a multi-lines selection yet 😅";

    case ErrorReason.CantMoveStatementDown:
      return "I'm sorry, I can't move this statement down 😅";

    case ErrorReason.CantMoveMultiLinesStatementDown:
      return "I'm sorry, I can't move down a multi-lines selection yet 😅";

    case ErrorReason.CantInlineExportedVariables:
      return "I'm sorry, I can't inline exported variables yet 😅";

    case ErrorReason.CantInlineRedeclaredVariables:
      return "I'm sorry, I can't inline redeclared variables yet 😅";

    default:
      return "I'm sorry, something went wrong but I'm not sure what 😅";
  }
}

function didNotFound(element: string): string {
  return `I didn't found ${element} from current selection 🤔`;
}
