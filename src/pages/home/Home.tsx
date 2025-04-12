import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, StartButton, StopButton } from "./style";
import * as zod from 'zod'
import { createContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCycleForm } from "./components/newCycleForm/NewCycleForm";
import { Countdown } from "./components/countdown/Countdown";

/*
o register():
 recebe o nome do input e retorna alguns métodos 
Ex: onChange, onBlur... monitorar os inputs 
*/

//regras de validacao 

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
  markCurrentCycleAsFinished: () => void;
  amountSecondsPassed: number, 
  setSecondPassed: (seconds: number) => void
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(1, 'Precisa ser no mínimo 5min').max(60, 'Precisa ser no maximo 60min')
})

type newCycleFormDdata = zod.infer<typeof newCycleFormValidationSchema> //cria um type a partir do schema acima 

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, SetAmountSecondsPassed] = useState(0) //quantos segundos se passaram para ir reduzindo

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)


  const handleCreateNewCycle = (data: newCycleFormDdata) => {
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
    reset() //volta para os valores originais -> defaultValues
  }

  const handleInteruptCycle = () => {

    setCycles(cycles.map(cycle => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedate: new Date() }
      } else {
        return cycle
      }
    }))

    setActiveCycleId(null)
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

  //acesso a tudo 
  const newCycleForm = useForm<newCycleFormDdata>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: ' ',
      minutesAmount: 0
    }
  })

  const setSecondPassed = (seconds: number) => {
    SetAmountSecondsPassed(seconds)
  }

  const { handleSubmit, watch, reset } = newCycleForm

  const isSumitDisabled = !watch('task')
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondPassed }}>
          {/*passa as informações do newCycleForm */}
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {
          activeCycle ? (
            <StopButton type="button" onClick={handleInteruptCycle}>
              <HandPalm size={24} />
              Parar
            </StopButton>
          ) : (
            <StartButton type="submit" disabled={isSumitDisabled}>
              <Play size={24} />
              Começar
            </StartButton>
          )
        }
      </form>
    </HomeContainer>
  )
}
