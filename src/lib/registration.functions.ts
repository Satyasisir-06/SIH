import { createServerFn } from "@tanstack/react-start";
import { registrationSchema, type RegistrationInput } from "./registration-schema";

export type SubmitRegistrationResult = {
  registrationId: string;
  teamName: string;
  problemStatementId: string;
  problemStatementTitle: string;
  memberCount: number;
  paymentTxnId?: string;
};

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((input: RegistrationInput) => registrationSchema.parse(input))
  .handler(async ({ data }): Promise<SubmitRegistrationResult> => {
    const { persistRegistration } = await import("./registration.server");
    return persistRegistration(data);
  });
