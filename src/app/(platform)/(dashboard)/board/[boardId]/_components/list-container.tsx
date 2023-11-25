"use client"

import { List } from "@prisma/client"
import { ListWithCards } from "../../../../../../../types"
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd"
import { useAction } from "../../../../../../../hooks/use-action";
import { updateListOrder } from "../../../../../../../actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "../../../../../../../actions/update-card-order";

interface ListContainerProps {
    lists: ListWithCards[];
    boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export const ListContainer = ({
    lists,
    boardId,
}: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(lists)

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success("List reordered")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: () => {
            toast.success("Card reordered")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    useEffect(() => {
        setOrderedData(lists)
    }, [lists])

    const onDragEnd = (result: any) => {
        const { destination, source, type } = result

        if (!destination) {
            return
        }

        // if dropped in the same position
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        // user moves a list
        if (type === "list") {
            const items = reorder(
                orderedData,
                source.index,
                destination.index,
            ).map((item, index) => ({ ...item, order: index }));

            setOrderedData(items)
            executeUpdateListOrder({ items, boardId })
        }

        // user moves a card
        if (type === "card") {
            let newOrderedData = [...orderedData];

            // Source and destination list
            const sourceList = newOrderedData.find(list => list.id === source.droppableId)
            const destList = newOrderedData.find(list => list.id === destination.droppableId)

            if (!sourceList || !destList) {
                return
            }

            // check if card exists on the source list
            if (!sourceList.cards) {
                sourceList.cards = []
            }

            // check if cards exists on the destination list
            if (!destList.cards) {
                destList.cards = []
            }

            // moving the card in the same list
            if (source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                );

                reorderedCards.forEach((card, index) => {
                    card.order = index
                });

                sourceList.cards = reorderedCards

                setOrderedData(newOrderedData);

                executeUpdateCardOrder({
                    boardId,
                    items: reorderedCards,
                })


                // User Moves the card to another list
            } else {
                //Remove card from the source
                const [movedCard] = sourceList.cards.splice(source.index, 1)

                // assign new listid to the moved card
                movedCard.listId = destination.droppableId


                destList.cards.splice(destination.index, 0, movedCard)

                sourceList.cards.forEach((card, index) => {
                    card.order = index
                })

                destList.cards.forEach((card, index) => {
                    card.order = index
                })

                setOrderedData(newOrderedData)

                executeUpdateCardOrder({
                    boardId: boardId,
                    items: destList.cards,
                })
            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-3 h-full">
                        {orderedData.map((list, index) => {
                            return (
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    list={list}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <ListForm />
                        <div className="flex-shrink-0 w-1" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    )
}