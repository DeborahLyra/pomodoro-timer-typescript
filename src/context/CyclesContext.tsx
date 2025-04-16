import { createContext, ReactNode, useState, useReducer } from "react"

interface CreateCycleData {
    task: string;
    minutesAmount: number

}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number,
    startDate: Date,
    interruptedate?: Date
    finishedDate?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondPassed: (seconds: number) => void
    InteruptCurrentCycle: () => void
    createCreateNewCycle: (data: CreateCycleData) => void
    cycles: Cycle[]
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CycleContextProps {
    children: ReactNode,
}

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null

}
export const CyclesContexProvider = ({ children }: CycleContextProps) => {
    
    const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
        switch (action.type) {
            case "create_new_cycle":
                return {
                    ...state,
                    cycles: [...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id,
                };
    
            case "interrupt_current_cycle":
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
    
            case "mark_cycle_finished":
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
    }, {
        cycles: [],
        activeCycleId: null,
    });
    

    const {cycles, activeCycleId} = cyclesState

    const [amountSecondsPassed, SetAmountSecondsPassed] = useState(0) //quantos segundos se passaram para ir reduzindo

    const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId)

    const createCreateNewCycle = (data: CreateCycleData) => {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id: id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch({
            type: "create_new_cycle",
            payload: {
                newCycle
            }
        })

        SetAmountSecondsPassed(0)
    }

    const InteruptCurrentCycle = () => {

        dispatch({
            type: "interrupt_current_cycle",
            payload: {
                activeCycleId
            }
        })

    }


    const setSecondPassed = (seconds: number) => {
        SetAmountSecondsPassed(seconds)
    }

    //nova funcao para não precisar passat o setCycle

    const markCurrentCycleAsFinished = () => {
       
        dispatch({
            type: "mark_cycle_finished",
            payload: {
                activeCycleId,
            },
        })
    }

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondPassed,
                createCreateNewCycle,
                InteruptCurrentCycle,
                cycles
            }}>
            {children}
        </CyclesContext.Provider>
    )
}