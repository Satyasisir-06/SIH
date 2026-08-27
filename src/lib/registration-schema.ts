import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().trim().min(2, "Enter the member name"),
  collegeRegId: z.string().trim().min(3, "Enter the college registration ID"),
  year: z.string().min(1, "Select the year"),
  department: z.string().trim().min(2, "Enter the department"),
  gender: z.enum(["Male", "Female", "Other"]),
});

export const registrationSchema = z.object({
  teamName: z.string().trim().min(2, "Enter a team name"),
  teamLeader: z.string().trim().min(2, "Enter the team leader name"),
  members: z.array(memberSchema).length(6, "Exactly 6 team members are required"),

  problemStatementId: z.string().trim().min(1, "Enter the problem statement number"),
  problemStatementTitle: z.string().trim().min(1, "Enter the problem statement"),
  problemStatementDomain: z.string().trim().optional().or(z.literal("")),

  paymentTxnId: z.string().trim().min(4, "Enter the payment transaction ID"),
  paymentScreenshot: z
    .object({
      name: z.string(),
      type: z.string(),
      dataUrl: z.string().min(20),
    })
    .nullable(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type TeamMemberInput = z.infer<typeof memberSchema>;
