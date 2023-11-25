"use client"

import { FormInput } from "@/components/form/form-input";
import { List } from "@prisma/client";
import { useState, useRef, ElementRef } from "react";
import { useEventListener } from "usehooks-ts";
import { useAction } from "../../../../../../../hooks/use-action";
import { updateList } from "../../../../../../../actions/update-list";
import { toast } from "sonner";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
    list: List;
    onAddCard: () => void;
}

export const ListHeader = ({ 
    list,
    onAddCard,
 }: ListHeaderProps) => {
    const [title, setTitle] = useState(list.title)
    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        });
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const { execute } = useAction(updateList, {
        onSuccess: (data) => {
            toast.success(`Renamed to "${data.title}"`)
            setTitle(data.title)
            disableEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string
        const id = formData.get("id") as string
        const boardId = formData.get("boardId") as string

        if (title === list.title) {
            return disableEditing()
        }

        execute({
            title,
            id,
            boardId,
        })
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            formRef.current?.requestSubmit()
        }
    };

    useEventListener("keydown", onKeyDown)

    return (
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {isEditing ? (
                <form
                    ref={formRef}
                    action={handleSubmit}
                    className="flex-1 px-[2px]">
                    <input name="id" id="id" hidden value={list.id} />
                    <input name="boardId" id="boardId" hidden value={list.boardId} />
                    <FormInput
                        id="title"
                        ref={inputRef}
                        onBlur={onBlur}
                        placeholder="Enter list title..."
                        defaultValue={title}
                        className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                    />
                    <button type="submit" hidden />
                </form>
            ) : (
                <div
                    onClick={enableEditing}
                    className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
                >
                    {title}
                </div>
            )}
            <ListOptions 
                onAddCard={onAddCard}
                list={list}
            />
        </div>
    )
}