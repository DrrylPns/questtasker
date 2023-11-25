import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteList } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof DeleteList>
export type ReturnType = ActionState<InputType, List>