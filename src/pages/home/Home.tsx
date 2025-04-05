import { Play } from "@phosphor-icons/react";
import { HomeContainer, FormnContainer, CountdownContainer, Separator, StartButton, MinutesInput, TaskInput } from "./style";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'

/*
o register():

recebe o nome do input e retorna alguns métodos 
Ex: onChange, onBlur... monitorar os inputs 
*/

//regras de validacao 

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(5, 'Precisa ser no mínimo 5min').max(60,'Precisa ser no maximo 60min')
})

export function Home() {

  const { register, handleSubmit, watch,formState } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })

  const handleCreateNewCycle = (data:any) => {
    
  }

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
            {...register("minutesAmount", {valueAsNumber: true})} //fazer com que seja armazenado um número
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

        <StartButton type="submit" disabled = {isSumitDisabled}>
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </HomeContainer>
  )
}
