import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";

import { UpdateCardOrder } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof UpdateCardOrder>
export type ReturnType = ActionState<InputType, Card[]>