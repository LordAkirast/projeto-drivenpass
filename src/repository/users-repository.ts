import { Prisma } from '@prisma/client';
import { prisma } from '../config';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  console.log('entrou no create/user/validate/repository/findbyemaieeeel')
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  console.log('passou do params')

  if (select) {
    params.select = select;
  }

  console.log('passou do if')
  return prisma.user.findUnique(params);
}

async function emailExists(email: string) {
  console.log('entrou no create/user/validate/repository/findbyemaieeeel');

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  console.log('passou do findUnique');

  if (user) {
    return true;
  } else {
    console.log('lançando exceção');
    throw { type: "emailNotFound_error", message: "E-mail not found." };
  }
}


async function create(data: Prisma.UserUncheckedCreateInput) {
  console.log('CREAAAAAAAAAAAATE')
  return prisma.user.create({
    data,
  });
}



async function createSession(userId: number, token: string, expirationTimestamp: Date) {
  return prisma.session.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      token,
      expiration_timestamp: expirationTimestamp,
    },
  });
}


export const userRepository = {
  findByEmail,
  create,
  emailExists,
  createSession,
};
