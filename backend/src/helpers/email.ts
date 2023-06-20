import nodemailer from 'nodemailer';
import { userRepository } from '../repositories/userRepository';

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5e113efba470dd",
    pass: "4b2d0ed25e51ac"
  }
});

export async function sendResetPasswordEmail(email: string, resetPasswordCode: string) {
  try {
    const userRepos = userRepository;
    const user = await userRepos.findOne({ where: {email} });

    if (!user) {
      console.log('Usuário não encontrado');
      return;
    }

    const mailOptions = {
      from: 'rafaelgiaqueto8@gmail.com',
      to: user.email,
      subject: 'Redefinição de senha',
      text: 'Precisa de uma senha nova? Fica tranquilo e clica no botão abaixo.',
      html: `<p>Precisa de uma senha nova? Fica tranquilo e <a href="https://localhost:3000/reset-password?email=${user.email}&code=${resetPasswordCode}">clica aqui</a>.</p>
             <p>Se você não solicitou uma redefinição de senha, pode ignorar esta mensagem.</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de redefinição de senha enviado:', info.response);
  } catch (error) {
    console.log('Erro ao enviar o email de redefinição de senha:', error);
  }
}

// Função para enviar e-mail de confirmação de redefinição de senha
export async function sendPasswordResetConfirmationEmail(email: string) {
  try {
    const userRepos = userRepository;
    const user = await userRepos.findOne({ where: {email} });

    if (!user) {
      console.log('Usuário não encontrado');
      return;
    }

    const mailOptions = {
      from: 'rafaelgiaqueto8@gmail.com',
      to: user.email,
      subject: 'Confirmação de redefinição de senha',
      text: 'Sua senha foi redefinida com sucesso.',
      html: '<p>Sua senha foi redefinida com sucesso.</p>'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de confirmação de redefinição de senha enviado:', info.response);
  } catch (error) {
    console.log('Erro ao enviar o email de confirmação de redefinição de senha:', error);
  }
}
