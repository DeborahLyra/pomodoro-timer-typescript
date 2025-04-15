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

export const CyclesContexProvider = ({ children }: CycleContextProps) => {

    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {

        if (action.type === "create_new_cycle") {
            return [...state, action.payload.newCycle]
        }

        return state
    }, [])

    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
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

        // setCycles(prev => [...prev, newCycle])
        setActiveCycleId(id)
        SetAmountSecondsPassed(0)
    }

    const InteruptCurrentCycle = () => {

        // setCycles(cycles.map(cycle => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, interruptedate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // }))

        dispatch({
            type: "interrupt_current_cycle",
            payload: {
                activeCycleId
            }
        })

        setActiveCycleId(null)
    }


    const setSecondPassed = (seconds: number) => {
        SetAmountSecondsPassed(seconds)
    }

    //nova funcao para não precisar passat o setCycle

    const markCurrentCycleAsFinished = () => {
        // setCycles(cycles.map(cycle => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, finishedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // })
        // )

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