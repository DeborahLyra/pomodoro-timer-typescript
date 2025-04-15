import { HandPalm, Play } from "@phosphor-icons/react";
import { HomeContainer, StartButton, StopButton } from "./style";
import * as zod from 'zod'
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCycleForm } from "./components/newCycleForm/NewCycleForm";
import { Countdown } from "./components/countdown/Countdown";
import { CyclesContext } from "../../context/CyclesContext";
import { useContext } from "react";

/*
o register():
 recebe o nome do input e retorna alguns métodos 
Ex: onChange, onBlur... monitorar os inputs 
*/

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(1, 'Precisa ser no mínimo 5min').max(60, 'Precisa ser no maximo 60min')
})

type newCycleFormDdata = zod.infer<typeof newCycleFormValidationSchema> //cria um type a partir do schema acima 

export function Home() {

  const { activeCycle, createCreateNewCycle, InteruptCurrentCycle } = useContext(CyclesContext)

  //acesso a tudo 
  const newCycleForm = useForm<newCycleFormDdata>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: ' ',
      minutesAmount: 0
    }
  })

  const handleCreateNewCycle = (data: newCycleFormDdata) => {
    createCreateNewCycle(data)
    reset() //volta para os valores originais -> defaultValues
  }

  const { handleSubmit, watch, reset } = newCycleForm

  const isSumitDisabled = !watch('task')
  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>

        {/*passa as informações do newCycleForm */}
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {
          activeCycle ? (
            <StopButton type="button" onClick={InteruptCurrentCycle}>
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
