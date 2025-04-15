import { createContext, ReactNode, useState } from "react"

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
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CycleContextProps {
    children: ReactNode,
}

export const CyclesContexProvider = ({ children }: CycleContextProps) => {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, SetAmountSecondsPassed] = useState(0) //quantos segundos se passaram para ir reduzindo

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const createCreateNewCycle = (data: CreateCycleData) => {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id: id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles(prev => [...prev, newCycle])
        setActiveCycleId(id)
        SetAmountSecondsPassed(0)
    }

    const InteruptCurrentCycle = () => {

        setCycles(cycles.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedate: new Date() }
            } else {
                return cycle
            }
        }))

        setActiveCycleId(null)
    }


    const setSecondPassed = (seconds: number) => {
        SetAmountSecondsPassed(seconds)
    }

    //nova funcao para não precisar passat o setCycle

    const markCurrentCycleAsFinished = () => {
        setCycles(cycles.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        })
        )
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
                InteruptCurrentCycle
            }}>
            {children}
        </CyclesContext.Provider>
    )
}