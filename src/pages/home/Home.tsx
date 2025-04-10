import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, FormnContainer, CountdownContainer, Separator, StartButton, MinutesInput, TaskInput, StopButton } from "./style";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

/*
o register():
 recebe o nome do input e retorna alguns métodos 
Ex: onChange, onBlur... monitorar os inputs 
*/

//regras de validacao 

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(1, 'Precisa ser no mínimo 5min').max(60, 'Precisa ser no maximo 60min')
})


type newCycleFormDdata = zod.infer<typeof newCycleFormValidationSchema> //cria um type a partir do schema acima 

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number,
  startDate: Date,
  interruptedate?: Date
  finishedDate?: Date
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, SetAmountSecondsPassed] = useState(0) //quantos segundos se passaram para ir reduzindo

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 //transformar para segungos o tempo
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 //calcular quantos segundos se passaram
  const minutesAmount = Math.floor(currentSeconds / 60) //calcular os minutos dentro dos segundos 
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0') //incluit o 0 no inicio
  const seconds = String(secondsAmount).padStart(2, '0') //incluit o 0 no inicio

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormDdata>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: ' ',
      minutesAmount: 0
    }
  })

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const differenceSeconds = differenceInSeconds(new Date, activeCycle.startDate)

        if (differenceSeconds >= totalSeconds) {
          setCycles(cycles.map(cycle => {
            if (cycle.id === activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          }))

          SetAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          SetAmountSecondsPassed(differenceSeconds)
        }


      }, 1000)
    }

    return () => {
      clearInterval(interval)    // <-- Aqui o timer é parado
    }
  }, [activeCycle, totalSeconds, activeCycleId])


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

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const isSumitDisabled = !watch('task')
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormnContainer>
          <label htmlFor="">Vou trabalhar em </label>
          <TaskInput
            id="text"
            placeholder="Dê um nome para seu projeto"
            list='task-suggestions'
            {...register("task")}
            disabled={!!activeCycle}
          />

          <label htmlFor="">durante</label>
          <MinutesInput
            type="number"
            id="minutesAmount"
            step={1}
            min={1}
            max={60}
            placeholder="00"
            {...register("minutesAmount", { valueAsNumber: true })} //fazer com que seja armazenado um número
            disabled={!!activeCycle}
          />

          <span>minutos</span>
        </FormnContainer>


        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

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
