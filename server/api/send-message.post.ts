export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  if (!body.captcha_value) {
    throw createError({
      statusCode: 400,
      statusMessage: "Brak tokena.",
    });
  }

  console.log("DEBUG SERVICE ID:", config.emailjsServiceId);
  console.log("DEBUG PUBLIC KEY:", config.emailjsPublicKey);

  try {
    await $fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      body: {
        user_id: config.emailjsPublicKey,
        service_id: config.emailjsServiceId,
        template_id: config.emailjsTemplateId,
        accessToken: config.emailjsPrivateKey,
        template_params: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          message: body.message,
          time: body.time,
          "g-recaptcha-response": body.captcha_value,
        },
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("EmailJS Error:", error.data);
    throw createError({
      statusCode: 500,
      statusMessage: "Nie udało się wysłać wiadomości.",
    });
  }
});
