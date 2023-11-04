import { PrismaClient } from "@prisma/client";

/** @type {PrismaClient | null} */
let connection = null;

/** @type {PrismaClient} */
export const getPrismaClient = () => (connection ??= new PrismaClient());
