import { Play } from "@phosphor-icons/react";
import { HomeContainer, FormnContainer, CountdownContainer, Separator, StartButton, MinutesInput, TaskInput } from "./style";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useState } from "react";

/*
o register():
 recebe o nome do input e retorna alguns métodos 
Ex: onChange, onBlur... monitorar os inputs 
*/

//regras de validacao 

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(5, 'Precisa ser no mínimo 5min').max(60, 'Precisa ser no maximo 60min')
})


type newCycleFormDdata = zod.infer<typeof newCycleFormValidationSchema> //cria um type a partir do schema acima 

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number,
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormDdata>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: ' ',
      minutesAmount: 0
    }
  })

  const handleCreateNewCycle = (data: newCycleFormDdata) => {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount
    }

    setCycles(prev => [...prev, newCycle])
    setActiveCycleId(id)
    reset() //volta para os valores originais -> defaultValues
  }

  const activeCycle = cycles.find((cycle)=> cycle.id === activeCycleId)

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
          />

          <label htmlFor="">durante</label>
          <MinutesInput
            type="number"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
            placeholder="00"
            {...register("minutesAmount", { valueAsNumber: true })} //fazer com que seja armazenado um número
          />

          <span>minutos</span>
        </FormnContainer>


        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartButton type="submit" disabled={isSumitDisabled}>
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </HomeContainer>
  )
}
