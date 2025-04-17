import { ActionsTypes } from "./actions";

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number,
    startDate: Date,
    interruptedate?: Date
    finishedDate?: Date
}

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
    switch (action.type) {
        case ActionsTypes.create_new_cycle:
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id,
            };

        case ActionsTypes.interrupt_current_cycle:
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if (cycle.id === state.activeCycleId) {
                        return { ...cycle, interruptedDate: new Date() };
                    }
                    return cycle;
                }),
                activeCycleId: null,
            };

        case ActionsTypes.mark_cycle_finished:
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if (cycle.id === state.activeCycleId) {
                        return { ...cycle, finishedDate: new Date() };
                    }
                    return cycle;
                }),
                activeCycleId: null,
            };

        default:
            return state;
    }
}
