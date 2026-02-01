export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!(await verifyTurnstileToken(body.token))) {
    throw createError({
      statusCode: 403,
      statusMessage: "Bot verification has not succeed.",
    });
  }

  //emailjs send email

  return { success: true };
});
