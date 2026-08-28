import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().trim().min(2, "Enter the member name"),
  collegeRegId: z.string().trim().min(3, "Enter the college registration ID"),
  phone: z.string().trim().min(10, "Enter a valid 10-digit mobile number"),
  year: z.string().min(1, "Select the year"),
  department: z.string().trim().min(2, "Enter the department"),
  gender: z.enum(["Male", "Female", "Other"]),
});

export const registrationSchema = z.object({
  registrationType: z.enum(["full_team", "matchmaking"]).default("full_team"),
  teamName: z.string().trim().optional().default(""),
  teamLeader: z.string().trim().min(2, "Enter the contact person / leader name"),
  members: z.array(memberSchema).min(1, "At least 1 member is required").max(6, "Maximum 6 members"),

  skills: z.array(z.string()).optional().default([]),
  teamNeedNote: z.string().trim().optional().default(""),

  problemStatementId: z.string().trim().min(1, "Enter the problem statement number"),
  problemStatementTitle: z.string().trim().min(1, "Enter the problem statement"),
  problemStatementDomain: z.string().trim().optional().or(z.literal("")),

  paymentTxnId: z.string().trim().optional(),
  paymentScreenshot: z
    .object({
      name: z.string(),
      type: z.string(),
      dataUrl: z.string().min(20),
    })
    .nullable()
    .optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
export type TeamMemberInput = z.infer<typeof memberSchema>;
