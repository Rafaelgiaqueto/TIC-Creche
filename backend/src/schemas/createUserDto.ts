import z from 'zod'

export const createUserDto = z.object({
  nome: z.string().regex(/^[a-zA-Z\s]+$/, 'Por favor, digite apenas letras'),
  email: z.string().email('Por favor, insira um endereço de e-mail válido.'),
  senha: z.string().min(8, 'Por favor, insira uma senha forte com pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).max(255, 'Por favor, digite menos de 255 caracteres'),
});