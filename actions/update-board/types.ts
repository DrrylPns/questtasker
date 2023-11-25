import { Board } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateBoard } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof UpdateBoard>
export type ReturnType = ActionState<InputType, Board>