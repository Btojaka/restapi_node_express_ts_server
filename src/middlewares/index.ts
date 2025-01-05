import { validationResult } from "express-validator";
import colors from "colors";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  body: any;
}

export const handleInputErrors = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  console.log(colors.bgYellow("middleware"));
  console.log(colors.bgCyan(`req.body: ${JSON.stringify(req.body)}`));
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(
      colors.bgRed(`Error validation: ${JSON.stringify(errors.array())}`)
    );
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
