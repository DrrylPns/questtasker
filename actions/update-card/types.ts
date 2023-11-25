import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateCard } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof UpdateCard>
export type ReturnType = ActionState<InputType, Card>