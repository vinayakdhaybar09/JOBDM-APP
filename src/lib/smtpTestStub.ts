export async function smtpTestStub({ email, appPassword }: {email: string, appPassword: string}) {
  // Simulate a short network delay
  await new Promise((res) => setTimeout(res, 600));
  if (!appPassword) return { success: false, message: 'App password is required.' };
  return { success: true, message: 'SMTP connection successful!' };
}
