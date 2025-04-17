import { createContext, ReactNode, useState, useReducer } from "react"
import { Cycle, cyclesReducer } from "../cycle/reducer";
import { ActionsTypes, addNewCycleAction, interruptCycleAction, markAsFinishedCycleAction } from "../cycle/actions";

interface CreateCycleData {
    task: string;
    minutesAmount: number

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

export const CyclesContexProvider = ({ children }: CycleContextProps) => {

    const [cyclesState, dispatch] = useReducer( cyclesReducer, {
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

        dispatch(addNewCycleAction(newCycle))

        SetAmountSecondsPassed(0)
    }

    const InteruptCurrentCycle = () => {

        dispatch(interruptCycleAction())

    }


    const setSecondPassed = (seconds: number) => {
        SetAmountSecondsPassed(seconds)
    }

    //nova funcao para não precisar passat o setCycle

    const markCurrentCycleAsFinished = () => {
       
        dispatch(markAsFinishedCycleAction())
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