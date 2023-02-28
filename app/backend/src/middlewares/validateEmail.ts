import { Request, Response, NextFunction } from 'express';

const emailValid = (email: string): boolean => {
  const aroba = email.indexOf('@');
  if (aroba < 1) return false;

  const ponto = email.indexOf('.');
  if (ponto <= aroba + 2) return false;
  if (ponto === email.length - 1) return false;

  return true;
};

export default function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!emailValid(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return next();
}
