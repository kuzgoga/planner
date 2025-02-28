import { H3Event, EventHandlerRequest } from "h3";
import { ZodObject, ZodString, ZodTypeAny } from "zod";
import { LoginRequestSchema, LoginResponse } from "../../models/login";
import { compareSync } from "bcrypt-ts";
import { validateRequest } from "../../utils/validate_request";
import { createTypedRoute } from "../../utils/typed_route";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and starts a session.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 401
 *                 statusMessage:
 *                   type: string
 *                   example: Неверные учетные данные
 */
async function loginHandler(event: H3Event): Promise<LoginResponse> {
  const loginAttempt = await validateRequest(event, LoginRequestSchema);
  const user = await User.findOneBy({ email: loginAttempt.email });

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Неверные учетные данные",
    });
  }

  if (!compareSync(loginAttempt.password, user.password_hash)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Неверные учетные данные",
    });
  }

  const name = `${user.firstName} ${user.lastName}`;

  await setUserSession(event, {
    user: {
      id: user.id,
      name: name,
      role: user.role,
    },
  });

  return {};
}

export default createTypedRoute(loginHandler);
