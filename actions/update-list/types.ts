import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateList } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof UpdateList>
export type ReturnType = ActionState<InputType, List>