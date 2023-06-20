import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import { sendResetPasswordEmail } from '../helpers/email';
import { v4 as uuidv4 } from 'uuid';

export class ResetPasswordController {
  sendResetPasswordEmail = async (req: Request, res: Response) => {
    const { email } = req.body;

    // Verificar se o e-mail existe no banco de dados
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'E-mail não encontrado' });
    }

    const resetPasswordCode = this.generateResetPasswordCode();

    user.reset_password_code = resetPasswordCode;
    await userRepository.save(user);

    sendResetPasswordEmail(email, resetPasswordCode);

    return res.json({ message: 'E-mail de redefinição de senha enviado' });
  };

  private generateResetPasswordCode() {
    return uuidv4();
  }
}