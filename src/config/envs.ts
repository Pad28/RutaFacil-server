import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    DATABASE_URL: get('DATABASE_URL').required().asString(),
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),
}