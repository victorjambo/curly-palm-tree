import { PrismaClient } from "@prisma/client";

let connection = null;

export const getPrismaClient = () => (connection ??= new PrismaClient());
