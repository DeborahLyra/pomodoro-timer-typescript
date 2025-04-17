import { Cycle } from "./reducer"

export enum ActionsTypes {
    interrupt_current_cycle= "interrupt_current_cycle",
    mark_cycle_finished= "mark_cycle_finished",
    create_new_cycle= "create_new_cycle"
}

export const addNewCycleAction = (newCycle: Cycle) => {
    return(
        {
            type: ActionsTypes.create_new_cycle,
            payload: {
                newCycle
            }
        }
    )
}

export const interruptCycleAction = () => {
    return(
        {
            type: ActionsTypes.interrupt_current_cycle,
        }
    )
}

export const markAsFinishedCycleAction = () => {
    return(
        {
            type: ActionsTypes.mark_cycle_finished,
        }
    )
}